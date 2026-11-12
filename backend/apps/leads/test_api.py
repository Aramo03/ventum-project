from django.test import TestCase
from rest_framework.test import APIClient

from apps.leads.models import NewsletterSubscriber


class LeadsApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_duplicate_newsletter_email_returns_400_and_one_row(self):
        url = "/api/leads/newsletter/"
        first = self.client.post(url, {"email": "news-api@example.com"}, format="json")
        self.assertEqual(first.status_code, 201)

        second = self.client.post(url, {"email": "news-api@example.com"}, format="json")
        self.assertEqual(second.status_code, 400)
        self.assertEqual(
            NewsletterSubscriber.objects.filter(email="news-api@example.com").count(),
            1,
        )

    def test_wholesale_without_text_returns_400(self):
        response = self.client.post(
            "/api/leads/wholesale/",
            {
                "name": "Ashot",
                "phone": "+37400000000",
                "email": "wholesale-api@example.com",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
