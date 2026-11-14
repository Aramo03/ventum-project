import hashlib
import hmac
import logging
from decimal import Decimal, InvalidOperation

from django.conf import settings
from django.db import transaction
from django.http import HttpResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

logger = logging.getLogger(__name__)

def _response(ok):
    return HttpResponse(
        "OK" if ok else "FAIL",
        content_type="text/plain",
        status=200 if ok else 400,
    )

def _amount(value):
    try:
        amount = Decimal(value)
        if not amount.is_finite():
            return None
        quantized = amount.quantize(Decimal("0.01"))
        return quantized if amount == quantized else None
    except (InvalidOperation, TypeError, ValueError):
        return None

def _same_amount(received, expected):
    parsed = _amount(received)
    return parsed is not None and parsed == _amount(expected)

@csrf_exempt
@require_POST
def idram_result(request):
    """Handle Idram's precheck and server-to-server payment confirmation."""
    from .models import Order

    data = request.POST
    bill_no = data.get("EDP_BILL_NO", "")
    account = data.get("EDP_REC_ACCOUNT", "")
    amount = data.get("EDP_AMOUNT", "")
    expected_account = getattr(settings, "IDRAM_REC_ACCOUNT", "")

    if (
        not bill_no
        or not expected_account
        or not hmac.compare_digest(account, expected_account)
    ):
        return _response(False)

    if data.get("EDP_PRECHECK", "").upper() == "YES":
        order = (
            Order.objects.filter(bill_no=bill_no, status="pending")
            .only("amount")
            .first()
        )
        if order is None or not _same_amount(amount, order.amount):
            return _response(False)
        return _response(True)

    payer = data.get("EDP_PAYER_ACCOUNT", "")
    trans_id = data.get("EDP_TRANS_ID", "")
    trans_date = data.get("EDP_TRANS_DATE", "")
    checksum = data.get("EDP_CHECKSUM", "")
    secret = getattr(settings, "IDRAM_SECRET_KEY", "")
    if not all((payer, trans_id, trans_date, checksum, secret)):
        return _response(False)

    checksum_source = ":".join(
        (account, amount, secret, bill_no, payer, trans_id, trans_date)
    )
    expected_checksum = hashlib.md5(checksum_source.encode("utf-8")).hexdigest()
    if not hmac.compare_digest(checksum.lower(), expected_checksum):
        return _response(False)

    just_paid = False
    with transaction.atomic():
        order = Order.objects.select_for_update().filter(bill_no=bill_no).first()
        if order is None or not _same_amount(amount, order.amount):
            return _response(False)
        if order.status == "paid":
            return _response(True)
        if order.status != "pending":
            return _response(False)

        order.status = "paid"
        order.idram_trans_id = trans_id
        order.paid_at = timezone.now()
        order.save(update_fields=("status", "idram_trans_id", "paid_at"))
        just_paid = True

    if just_paid:
        try:
            from .mail import send_order_paid_email # type: ignore

            send_order_paid_email(order)
        except Exception:
            logger.exception("Could not send paid-order email for %s", bill_no)
    return _response(True)
