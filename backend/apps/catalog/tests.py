from decimal import Decimal

from django.test import TestCase

from apps.catalog.models import (
    Category,
    CategoryTranslation,
    Product,
    ProductTranslation,
)


def _published_defaults():
    field_names = {field.name for field in Product._meta.fields}
    if "is_published" in field_names:
        return {"is_published": True}
    if "published" in field_names:
        return {"published": True}
    return {}


class CatalogModelTests(TestCase):
    def test_category_with_three_name_translations(self):
        category = Category.objects.create(slug="textile-bedding", store="textile")
        for language, name in (
            ("am", "Անկողնային"),
            ("en", "Bedding"),
            ("ru", "Постельное"),
        ):
            CategoryTranslation.objects.create(
                category=category,
                language=language,
                name=name,
            )

        languages = set(
            category.translations.values_list("language", flat=True)
        )
        self.assertEqual(languages, {"am", "en", "ru"})
        self.assertEqual(category.translations.get(language="en").name, "Bedding")

    def test_published_textile_and_baby_products(self):
        textile_category = Category.objects.create(
            slug="textile-towels",
            store="textile",
        )
        baby_category = Category.objects.create(
            slug="baby-care",
            store="baby",
        )

        textile_product = Product.objects.create(
            category=textile_category,
            price=Decimal("25000.00"),
            sku="TEXTILE-TEST-001",
            **_published_defaults(),
        )
        baby_product = Product.objects.create(
            category=baby_category,
            price=Decimal("15000.00"),
            sku="BABY-TEST-001",
            **_published_defaults(),
        )

        self.assertEqual(textile_product.category.store, "textile")
        self.assertEqual(baby_product.category.store, "baby")
        self.assertIsInstance(textile_product.price, Decimal)
        self.assertIsInstance(baby_product.price, Decimal)
        self.assertEqual(textile_product.sku, "TEXTILE-TEST-001")
        self.assertEqual(baby_product.sku, "BABY-TEST-001")

        published_field = next(
            (name for name in ("is_published", "published") if hasattr(textile_product, name)),
            None,
        )
        if published_field is not None:
            self.assertTrue(getattr(textile_product, published_field))
            self.assertTrue(getattr(baby_product, published_field))

    def test_product_without_ru_translation_still_saves(self):
        category = Category.objects.create(slug="textile-sheets", store="textile")
        product = Product.objects.create(
            category=category,
            price=Decimal("12000.00"),
            sku="TEXTILE-NO-RU-001",
            **_published_defaults(),
        )
        ProductTranslation.objects.create(
            product=product,
            language="am",
            name="Սավան",
            description="Բամբակյա սավան",
        )
        ProductTranslation.objects.create(
            product=product,
            language="en",
            name="Sheet",
            description="Cotton sheet",
        )

        product.refresh_from_db()
        languages = set(product.translations.values_list("language", flat=True))
        self.assertEqual(languages, {"am", "en"})
        self.assertFalse(product.translations.filter(language="ru").exists())
        self.assertEqual(Product.objects.filter(pk=product.pk).count(), 1)
