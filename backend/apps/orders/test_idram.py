import hashlib
from decimal import Decimal
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from apps.catalog.models import Category, Product, ProductTranslation
from apps.orders.models import Order

User = get_user_model()

IDRAM_SETTINGS = {
    "IDRAM_REC_ACCOUNT": "merchant-test",
    "IDRAM_SECRET_KEY": "test-secret-key",
    "IDRAM_PAYMENT_URL": "https://payments.example.test/",
    "ORDER_NOTIFY_EMAIL": "shop@example.test",
}


def idram_checksum(*, account, amount, secret, bill_no, payer, trans_id, trans_date):
    source = ":".join((account, amount, secret, bill_no, payer, trans_id, trans_date))
    return hashlib.md5(source.encode("utf-8")).hexdigest()


@override_settings(**IDRAM_SETTINGS)
class CheckoutAndIdramTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="buyer@example.com",
            password="secret-pass",
            first_name="Ani",
            last_name="Buyer",
        )
        self.category = Category.objects.create(slug="pay-textile", store="textile")
        self.product = Product.objects.create(
            category=self.category,
            price=Decimal("1500.00"),
            sku="TX-PAY-001",
            is_published=True,
        )
        ProductTranslation.objects.create(
            product=self.product,
            language="ru",
            name="Товар",
            description="Описание",
        )
        ProductTranslation.objects.create(
            product=self.product,
            language="en",
            name="Item",
            description="Desc",
        )

    def _auth(self):
        self.client.force_authenticate(user=self.user)

    def _create_pending_order(self, amount="1500.00"):
        return Order.objects.create(
            user=self.user,
            bill_no="VNT-99",
            status=Order.STATUS_PENDING,
            amount=Decimal(amount),
            email=self.user.email,
            name="Ani Buyer",
        )

    def test_empty_checkout_returns_400(self):
        self._auth()
        response = self.client.post("/api/checkout/?language=en", {}, format="json")
        self.assertEqual(response.status_code, 400)
        order = Order.objects.filter(user=self.user).first()
        self.assertIsNone(order)

    def test_precheck_does_not_set_paid(self):
        order = self._create_pending_order()
        response = self.client.post(
            "/api/payments/idram/result/",
            {
                "EDP_PRECHECK": "YES",
                "EDP_BILL_NO": order.bill_no,
                "EDP_REC_ACCOUNT": IDRAM_SETTINGS["IDRAM_REC_ACCOUNT"],
                "EDP_AMOUNT": "1500.00",
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "OK")
        order.refresh_from_db()
        self.assertEqual(order.status, Order.STATUS_PENDING)
        self.assertFalse(order.idram_trans_id)

    @patch("apps.orders.mail.send_order_paid_email")
    def test_valid_checksum_sets_paid_and_sends_once(self, send_email):
        order = self._create_pending_order()
        payload = {
            "EDP_BILL_NO": order.bill_no,
            "EDP_REC_ACCOUNT": IDRAM_SETTINGS["IDRAM_REC_ACCOUNT"],
            "EDP_AMOUNT": "1500.00",
            "EDP_PAYER_ACCOUNT": "payer-1",
            "EDP_TRANS_ID": "TR-100",
            "EDP_TRANS_DATE": "20260101120000",
        }
        payload["EDP_CHECKSUM"] = idram_checksum(
            account=payload["EDP_REC_ACCOUNT"],
            amount=payload["EDP_AMOUNT"],
            secret=IDRAM_SETTINGS["IDRAM_SECRET_KEY"],
            bill_no=payload["EDP_BILL_NO"],
            payer=payload["EDP_PAYER_ACCOUNT"],
            trans_id=payload["EDP_TRANS_ID"],
            trans_date=payload["EDP_TRANS_DATE"],
        )

        response = self.client.post("/api/payments/idram/result/", payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "OK")
        order.refresh_from_db()
        self.assertEqual(order.status, Order.STATUS_PAID)
        self.assertEqual(order.idram_trans_id, "TR-100")
        send_email.assert_called_once()

        response_again = self.client.post("/api/payments/idram/result/", payload)
        self.assertEqual(response_again.status_code, 200)
        self.assertEqual(response_again.content.decode(), "OK")
        send_email.assert_called_once()
        order.refresh_from_db()
        self.assertEqual(order.status, Order.STATUS_PAID)

    def test_bad_checksum_leaves_pending(self):
        order = self._create_pending_order()
        response = self.client.post(
            "/api/payments/idram/result/",
            {
                "EDP_BILL_NO": order.bill_no,
                "EDP_REC_ACCOUNT": IDRAM_SETTINGS["IDRAM_REC_ACCOUNT"],
                "EDP_AMOUNT": "1500.00",
                "EDP_PAYER_ACCOUNT": "payer-1",
                "EDP_TRANS_ID": "TR-200",
                "EDP_TRANS_DATE": "20260101120000",
                "EDP_CHECKSUM": "deadbeef" * 4,
            },
        )
        self.assertEqual(response.status_code, 400)
        order.refresh_from_db()
        self.assertEqual(order.status, Order.STATUS_PENDING)
        self.assertFalse(order.idram_trans_id)
