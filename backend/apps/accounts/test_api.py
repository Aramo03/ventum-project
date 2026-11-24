from decimal import Decimal
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from apps.catalog.models import Category, Product, ProductTranslation

User = get_user_model()

REGISTER_URL = "/api/auth/register/"
GOOGLE_URL = "/api/auth/google/"
STRONG_PASSWORD = "Register-pass-1"


def bearer(access):
    return {"HTTP_AUTHORIZATION": f"Bearer {access}"}


class AuthApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.category = Category.objects.create(slug="register-textile", store="textile")
        self.product = Product.objects.create(
            category=self.category,
            price=Decimal("12000.00"),
            sku="REG-CART-001",
            is_published=True,
        )
        ProductTranslation.objects.create(
            product=self.product,
            language="en",
            name="Sheet",
            description="Cotton",
        )

    def test_me_without_token_returns_401(self):
        response = self.client.get("/api/auth/me/")
        self.assertEqual(response.status_code, 401)

    def test_register_returns_token_that_can_shop(self):
        response = self.client.post(
            REGISTER_URL,
            {
                "email": "Buyer@Example.com",
                "password": STRONG_PASSWORD,
                "password_confirm": STRONG_PASSWORD,
                "first_name": "Ara",
                "last_name": "Ventum",
                "is_staff": True,
                "is_superuser": True,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        access = response.data["access"]
        self.assertTrue(access)
        self.assertIn("refresh", response.data)
        self.assertNotIn("password", response.data)

        user = User.objects.get(email__iexact="buyer@example.com")
        self.assertEqual(user.email, "Buyer@example.com")
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.check_password(STRONG_PASSWORD))

        me = self.client.get("/api/auth/me/", **bearer(access))
        self.assertEqual(me.status_code, 200)
        self.assertEqual(me.data["email"], "Buyer@example.com")

        cart = self.client.post(
            "/api/cart/items/",
            {"sku": self.product.sku, "qty": 1},
            format="json",
            **bearer(access),
        )
        self.assertEqual(cart.status_code, 200)
        self.assertEqual(cart.data["count"], 1)

    def test_duplicate_email_does_not_change_password(self):
        User.objects.create_user(email="buyer@example.com", password="Old-password-9")
        response = self.client.post(
            REGISTER_URL,
            {
                "email": "BUYER@example.com",
                "password": STRONG_PASSWORD,
                "password_confirm": STRONG_PASSWORD,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["code"], "email_taken")
        user = User.objects.get(email="buyer@example.com")
        self.assertTrue(user.check_password("Old-password-9"))
        self.assertEqual(User.objects.count(), 1)

    def test_password_mismatch_creates_no_user(self):
        response = self.client.post(
            REGISTER_URL,
            {
                "email": "new@example.com",
                "password": STRONG_PASSWORD,
                "password_confirm": "Register-pass-2",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["code"], "password_mismatch")
        self.assertFalse(User.objects.filter(email="new@example.com").exists())

    def test_short_password_creates_no_user(self):
        response = self.client.post(
            REGISTER_URL,
            {
                "email": "new@example.com",
                "password": "short",
                "password_confirm": "short",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["code"], "invalid_password")
        self.assertTrue(response.data["messages"])
        self.assertFalse(User.objects.filter(email="new@example.com").exists())


@override_settings(GOOGLE_CLIENT_ID="test-client-id")
class GoogleAuthApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    def post_google(self, identity):
        with patch(
            "apps.accounts.views.id_token.verify_oauth2_token",
            return_value=identity,
        ) as verify:
            response = self.client.post(
                GOOGLE_URL,
                {"credential": "google-id-token"},
                format="json",
            )
        verify.assert_called_once()
        return response

    def test_new_verified_email_creates_user_with_unusable_password(self):
        response = self.post_google(
            {
                "email": "google@example.com",
                "email_verified": True,
                "given_name": "Gohar",
                "family_name": "Sargsyan",
                "is_staff": True,
                "is_superuser": True,
            }
        )
        self.assertEqual(response.status_code, 200)
        access = response.data["access"]
        user = User.objects.get(email="google@example.com")
        self.assertFalse(user.has_usable_password())
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertEqual(user.first_name, "Gohar")
        self.assertEqual(user.last_name, "Sargsyan")
        me = self.client.get("/api/auth/me/", **bearer(access))
        self.assertEqual(me.status_code, 200)
        self.assertEqual(me.data["email"], "google@example.com")

    def test_existing_email_signs_in_without_changing_password(self):
        User.objects.create_user(email="google@example.com", password="Kept-password-9")
        response = self.post_google(
            {
                "email": "Google@Example.com",
                "email_verified": True,
                "given_name": "Other",
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.get(email="google@example.com")
        self.assertTrue(user.check_password("Kept-password-9"))
        self.assertEqual(user.first_name, "")
        me = self.client.get("/api/auth/me/", **bearer(response.data["access"]))
        self.assertEqual(me.status_code, 200)

    def test_unverified_email_is_rejected(self):
        response = self.post_google(
            {"email": "google@example.com", "email_verified": False}
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["code"], "google_email_unverified")
        self.assertFalse(User.objects.exists())

    def test_bad_token_is_rejected(self):
        with patch(
            "apps.accounts.views.id_token.verify_oauth2_token",
            side_effect=ValueError("bad token"),
        ):
            response = self.client.post(
                GOOGLE_URL,
                {"credential": "not-a-token"},
                format="json",
            )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["code"], "google_invalid")
        self.assertFalse(User.objects.exists())

    @override_settings(GOOGLE_CLIENT_ID="")
    def test_empty_client_id_is_unavailable(self):
        response = self.client.post(
            GOOGLE_URL,
            {"credential": "any-token"},
            format="json",
        )
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.data["code"], "google_unavailable")
