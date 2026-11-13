from django.test import TestCase
from rest_framework.test import APIClient


class AuthApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_me_without_token_returns_401(self):
        response = self.client.get("/api/auth/me/")
        self.assertEqual(response.status_code, 401)
