from django.test import TestCase
from rest_framework.test import APIClient

from apps.content.models import HomeBlock, HomeBlockTranslation


class ContentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        block = HomeBlock.objects.create(slot=HomeBlock.SlotChoices.HERO, order=0)
        HomeBlockTranslation.objects.create(
            home_block=block,
            language="en",
            title="Welcome to Ventum",
            text="Choose a store",
        )

    def test_home_blocks_language_en_returns_title(self):
        response = self.client.get(
            "/api/content/home-blocks/",
            {"language": "en"},
        )
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIsInstance(payload, list)
        self.assertGreaterEqual(len(payload), 1)
        self.assertIn("title", payload[0])
        self.assertEqual(payload[0]["title"], "Welcome to Ventum")
