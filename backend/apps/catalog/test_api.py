from decimal import Decimal

from django.test import TestCase
from rest_framework.test import APIClient

from apps.catalog.models import Category, Product, ProductTranslation


PRODUCTS_URL = "/api/catalog/products/"


class CatalogApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.textile = Category.objects.create(slug="api-textile", store="textile")
        self.baby = Category.objects.create(slug="api-baby", store="baby")

        self.published_textile = Product.objects.create(
            category=self.textile,
            price=Decimal("12000.00"),
            sku="TX-API-001",
            is_published=True,
        )
        ProductTranslation.objects.create(
            product=self.published_textile,
            language="en",
            name="Sheet EN",
            description="Cotton sheet",
        )
        ProductTranslation.objects.create(
            product=self.published_textile,
            language="ru",
            name="Простыня RU",
            description="Хлопковая простыня",
        )

        self.unpublished = Product.objects.create(
            category=self.textile,
            price=Decimal("5000.00"),
            sku="TX-API-DRAFT",
            is_published=False,
        )
        ProductTranslation.objects.create(
            product=self.unpublished,
            language="en",
            name="Draft",
            description="Hidden",
        )

        self.published_baby = Product.objects.create(
            category=self.baby,
            price=Decimal("8000.00"),
            sku="BB-API-001",
            is_published=True,
        )
        ProductTranslation.objects.create(
            product=self.published_baby,
            language="en",
            name="Baby set",
            description="Soft set",
        )

        self.en_only = Product.objects.create(
            category=self.textile,
            price=Decimal("9000.00"),
            sku="TX-API-EN-ONLY",
            is_published=True,
        )
        ProductTranslation.objects.create(
            product=self.en_only,
            language="en",
            name="English only towel",
            description="No Russian row",
        )

    def _results(self, response):
        payload = response.json()
        if isinstance(payload, dict) and "results" in payload:
            return payload["results"]
        return payload

    def test_product_list_returns_published_only(self):
        response = self.client.get(PRODUCTS_URL, {"language": "en"})
        self.assertEqual(response.status_code, 200)
        skus = {item["sku"] for item in self._results(response)}
        self.assertIn("TX-API-001", skus)
        self.assertIn("BB-API-001", skus)
        self.assertNotIn("TX-API-DRAFT", skus)

    def test_store_textile_excludes_baby_products(self):
        response = self.client.get(
            PRODUCTS_URL,
            {"store": "textile", "language": "en"},
        )
        self.assertEqual(response.status_code, 200)
        skus = {item["sku"] for item in self._results(response)}
        self.assertIn("TX-API-001", skus)
        self.assertNotIn("BB-API-001", skus)

    def test_language_ru_uses_russian_name_and_falls_back_to_en(self):
        response = self.client.get(PRODUCTS_URL, {"language": "ru"})
        self.assertEqual(response.status_code, 200)
        by_sku = {item["sku"]: item for item in self._results(response)}
        self.assertEqual(by_sku["TX-API-001"]["name"], "Простыня RU")
        self.assertIn("TX-API-EN-ONLY", by_sku)
        self.assertEqual(by_sku["TX-API-EN-ONLY"]["name"], "English only towel")

    def test_language_de_returns_400(self):
        response = self.client.get(PRODUCTS_URL, {"language": "de"})
        self.assertEqual(response.status_code, 400)

    def test_q_finds_sku_and_blank_q_does_not_shrink(self):
        published_count = Product.objects.filter(is_published=True).count()

        found = self.client.get(
            PRODUCTS_URL,
            {"language": "en", "q": "TX-API-001"},
        )
        self.assertEqual(found.status_code, 200)
        found_skus = {item["sku"] for item in self._results(found)}
        self.assertEqual(found_skus, {"TX-API-001"})

        blank = self.client.get(
            PRODUCTS_URL,
            {"language": "en", "q": "   "},
        )
        self.assertEqual(blank.status_code, 200)
        blank_skus = {item["sku"] for item in self._results(blank)}
        self.assertEqual(len(blank_skus), published_count)
        self.assertIn("TX-API-001", blank_skus)
        self.assertIn("BB-API-001", blank_skus)
        self.assertIn("TX-API-EN-ONLY", blank_skus)
