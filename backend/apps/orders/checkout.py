from decimal import Decimal
from uuid import uuid4

from django.conf import settings
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


def _product_name(product, language):
    from apps.core.translations import pick_translation
    translation = pick_translation(product.translations.all(), language)
    return translation.name if translation else product.sku

class CheckoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        from apps.cart.models import Cart # type: ignore
        from apps.core.idram_language import idram_language
        from .models import Order, OrderLine

        try:
            language = idram_language(
                request.data.get("language")
                or request.query_params.get("language")
                or request.headers.get("Accept-Language", "en")
                .split(",", 1)[0]
                .split("-", 1)[0]
            )
        except ValueError:
            return Response({"detail": "Unsupported language."}, status=400)

        payment = str(request.data.get("payment") or "card").strip().lower()
        fulfillment = str(request.data.get("fulfillment") or "").strip().lower()
        if payment not in {"card", "cash"}:
            return Response({"detail": "Unsupported payment."}, status=400)
        if fulfillment not in {"", "yerevan", "pickup"}:
            return Response({"detail": "Unsupported fulfillment."}, status=400)
        if fulfillment == "pickup":
            payment = "cash"

        with transaction.atomic():
            cart = (
                Cart.objects.select_for_update()
                .filter(user=request.user)
                .first()
            )
            if cart is None:
                return Response({"detail": "Your cart is empty."}, status=400)
            cart_items = list(cart.items.select_related("product").all())
            if not cart_items:
                return Response({"detail": "Your cart is empty."}, status=400)

            order_lines = []
            amount = Decimal("0.00")
            for cart_item in cart_items:
                product = cart_item.product
                qty = int(cart_item.qty)
                if qty < 1:
                    return Response({"detail": "Invalid cart quantity."}, status=400)
                price = Decimal(product.price).quantize(Decimal("0.01"))
                line_total = (price * qty).quantize(Decimal("0.01"))
                amount += line_total
                order_lines.append((product, qty, price, line_total))

            if fulfillment == "yerevan":
                amount += Decimal("3000.00")

            order = Order.objects.create(
                user=request.user,
                bill_no=f"VNT-TMP-{uuid4().hex}",
                status="pending",
                amount=amount.quantize(Decimal("0.01")),
                email=request.user.email,
                name=" ".join(
                    part
                    for part in (request.user.first_name, request.user.last_name)
                    if part
                ),
            )
            order.bill_no = f"VNT-{order.pk}"
            order.save(update_fields=("bill_no",))

            for product, qty, price, line_total in order_lines:
                OrderLine.objects.create(
                    order=order,
                    sku=product.sku,
                    name=_product_name(product, language.lower()),
                    qty=qty,
                    price=price,
                    line_total=line_total,
                )

            cart.items.all().delete()

        if payment == "cash":
            return Response(
                {"bill_no": order.bill_no, "payment": "cash"},
                status=201,
            )

        payment_url = getattr(
            settings,
            "IDRAM_PAYMENT_URL",
            "https://web.idram.am/payment.aspx",
        )
        fields = {
            "EDP_LANGUAGE": language,
            "EDP_REC_ACCOUNT": getattr(settings, "IDRAM_REC_ACCOUNT", ""),
            "EDP_DESCRIPTION": f"Ventum order {order.bill_no}",
            "EDP_AMOUNT": format(order.amount, ".2f"),
            "EDP_BILL_NO": order.bill_no,
            "EDP_EMAIL": order.email or "",
        }
        return Response(
            {"bill_no": order.bill_no, "payment_url": payment_url, "fields": fields},
            status=201,
        )


checkout_view = CheckoutView.as_view()
