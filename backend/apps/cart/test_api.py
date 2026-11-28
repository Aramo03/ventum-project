from decimal import Decimal

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from apps.catalog.models import Category, Product, ProductTranslation

User = get_user_model()


class CartApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="cart-user@example.com",
            password="secret-pass",
        )
        self.category = Category.objects.create(slug="cart-textile", store="textile")
        self.published = Product.objects.create(
            category=self.category,
            price=Decimal("12000.00"),
            sku="TX-CART-001",
            is_published=True,
        )
        ProductTranslation.objects.create(
            product=self.published,
            language="en",
            name="Sheet",
            description="Cotton",
        )
        self.unpublished = Product.objects.create(
            category=self.category,
            price=Decimal("5000.00"),
            sku="TX-CART-DRAFT",
            is_published=False,
        )
        ProductTranslation.objects.create(
            product=self.unpublished,
            language="en",
            name="Draft",
            description="Hidden",
        )

    def test_cart_without_token_returns_401(self):
        response = self.client.get("/api/cart/")
        self.assertEqual(response.status_code, 401)

    def test_unpublished_sku_returns_404(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            "/api/cart/items/",
            {"sku": self.unpublished.sku, "qty": 1},
            format="json",
        )
        self.assertEqual(response.status_code, 404)

    def test_product_can_be_added_only_once(self):
        self.client.force_authenticate(user=self.user)
        first = self.client.post(
            "/api/cart/items/",
            {"sku": self.published.sku, "qty": 1},
            format="json",
        )
        second = self.client.post(
            "/api/cart/items/",
            {"sku": self.published.sku, "qty": 1},
            format="json",
        )
        self.assertEqual(first.status_code, 200)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(second.data["count"], 1)
        self.assertEqual(second.data["items"][0]["qty"], 1)

    def test_quantity_cannot_rise_above_one(self):
        self.client.force_authenticate(user=self.user)
        self.client.post(
            "/api/cart/items/",
            {"sku": self.published.sku, "qty": 1},
            format="json",
        )
        response = self.client.patch(
            f"/api/cart/items/{self.published.sku}/",
            {"qty": 2},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        cart = self.client.get("/api/cart/")
        self.assertEqual(cart.data["items"][0]["qty"], 1)
