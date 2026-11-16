from decimal import Decimal
from types import ModuleType, SimpleNamespace
from unittest.mock import MagicMock, patch

from django.test import TestCase, override_settings
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.orders.checkout import CheckoutView


class CheckoutViewTests(TestCase):
    @override_settings(
        IDRAM_PAYMENT_URL="https://payments.example.test/",
        IDRAM_REC_ACCOUNT="merchant-123",
    )
    def test_checkout_creates_pending_order_and_returns_idram_fields(self):
        user = SimpleNamespace(
            is_authenticated=True,
            email="buyer@example.test",
            first_name="Ani",
            last_name="Example",
        )
        translation = SimpleNamespace(language="ru", name="Товар")
        product = SimpleNamespace(
            sku="SKU-1",
            price=Decimal("1250.00"),
            translations=SimpleNamespace(
                all=lambda: [translation],
            ),
        )
        cart_item = SimpleNamespace(product=product, qty=2)
        cart_items = MagicMock()
        cart_items.select_related.return_value.all.return_value = [cart_item]
        cart = SimpleNamespace(items=cart_items)

        cart_manager = MagicMock()
        (
            cart_manager.objects.select_for_update.return_value.filter.return_value.first
            .return_value
        ) = cart
        Cart = type("Cart", (), {"objects": cart_manager.objects})

        order = SimpleNamespace(
            pk=41,
            bill_no="",
            status="pending",
            amount=Decimal("2500.00"),
            email=user.email,
            save=MagicMock(),
        )
        order_manager = MagicMock()
        order_manager.objects.create.return_value = order
        Order = type("Order", (), {"objects": order_manager.objects})
        OrderLine = type(
            "OrderLine",
            (),
            {"objects": SimpleNamespace(create=MagicMock())},
        )

        cart_models = ModuleType("apps.cart.models")
        cart_models.Cart = Cart
        order_models = ModuleType("apps.orders.models")
        order_models.Order = Order
        order_models.OrderLine = OrderLine

        request = APIRequestFactory().post(
            "/api/checkout/?language=ru", {}, format="json"
        )
        force_authenticate(request, user=user)

        with patch.dict(
            "sys.modules",
            {
                "apps.cart.models": cart_models,
                "apps.orders.models": order_models,
            },
        ):
            response = CheckoutView.as_view()(request)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["bill_no"], "VNT-41")
        self.assertEqual(
            response.data["payment_url"], "https://payments.example.test/"
        )
        self.assertEqual(
            response.data["fields"],
            {
                "EDP_LANGUAGE": "RU",
                "EDP_REC_ACCOUNT": "merchant-123",
                "EDP_DESCRIPTION": "Ventum order VNT-41",
                "EDP_AMOUNT": "2500.00",
                "EDP_BILL_NO": "VNT-41",
                "EDP_EMAIL": "buyer@example.test",
            },
        )
        self.assertEqual(order.status, "pending")
        self.assertEqual(order.bill_no, "VNT-41")
        cart_items.all.return_value.delete.assert_called_once_with()
