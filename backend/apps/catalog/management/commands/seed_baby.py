from decimal import Decimal
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from apps.core.languages import LANGUAGE_CODES


BABY_STORE = "baby"

CATEGORIES = (
    {
        "slug": "baby-bedding",
        "names": {
            "am": "Մանկական անկողնային",
            "en": "Kids bedding",
            "ru": "Детское постельное",
        },
    },
    {
        "slug": "baby-care",
        "names": {
            "am": "Մանկական խնամք",
            "en": "Baby care",
            "ru": "Уход за малышом",
        },
    },
)

PRODUCT_SKU = "BABY-SAMPLE-001"
PRODUCT_PRICE = Decimal("15000.00")
PRODUCT_NAMES = {
    "am": "Բամբակյա մանկական հավաքածու",
    "en": "Cotton baby set",
    "ru": "Детский хлопковый набор",
}
PRODUCT_DESCRIPTIONS = {
    "am": "Փափուկ բամբակյա հավաքածու Ventum Baby-ից։",
    "en": "Soft cotton set from Ventum Baby.",
    "ru": "Мягкий хлопковый набор Ventum Baby.",
}

SEED_IMAGE = Path(settings.BASE_DIR) / "apps" / "catalog" / "seed_assets" / "baby-product.jpg"


def _require_catalog_models():
    try:
        from apps.catalog.models import (
            Category,
            CategoryTranslation,
            Product,
            ProductImage,
            ProductTranslation,
        )
    except ImportError as exc:
        raise CommandError(
            "Catalog models are missing. Merge Vach (feat/vach-catalog) before running seed_baby."
        ) from exc
    return Category, CategoryTranslation, Product, ProductImage, ProductTranslation


def _published_defaults(Product):
    field_names = {field.name for field in Product._meta.fields}
    if "is_published" in field_names:
        return {"is_published": True}
    if "published" in field_names:
        return {"published": True}
    return {}


def _upsert_category_translations(CategoryTranslation, category, names):
    for language in LANGUAGE_CODES:
        CategoryTranslation.objects.update_or_create(
            category=category,
            language=language,
            defaults={"name": names[language]},
        )


def _upsert_product_translations(ProductTranslation, product, names, descriptions):
    for language in LANGUAGE_CODES:
        ProductTranslation.objects.update_or_create(
            product=product,
            language=language,
            defaults={
                "name": names[language],
                "description": descriptions[language],
            },
        )


class Command(BaseCommand):
    help = "Seed Baby store categories and one sample product (idempotent; does not touch Textile)."

    @transaction.atomic
    def handle(self, *args, **options):
        Category, CategoryTranslation, Product, ProductImage, ProductTranslation = (
            _require_catalog_models()
        )

        if not SEED_IMAGE.is_file():
            raise CommandError(f"Seed image not found: {SEED_IMAGE}")

        categories = []
        for spec in CATEGORIES:
            category, _created = Category.objects.update_or_create(
                slug=spec["slug"],
                defaults={"store": BABY_STORE},
            )
            if category.store != BABY_STORE:
                raise CommandError(
                    f"Refusing to change store for existing slug {spec['slug']} (not Baby)."
                )
            _upsert_category_translations(CategoryTranslation, category, spec["names"])
            categories.append(category)

        primary_category = categories[0]
        product_defaults = {
            "category": primary_category,
            "price": PRODUCT_PRICE,
            **_published_defaults(Product),
        }
        product, _created = Product.objects.update_or_create(
            sku=PRODUCT_SKU,
            defaults=product_defaults,
        )
        existing_category = product.category
        if existing_category.store != BABY_STORE:
            raise CommandError(
                f"SKU {PRODUCT_SKU} belongs to store={existing_category.store}; not overwriting."
            )
        _upsert_product_translations(
            ProductTranslation,
            product,
            PRODUCT_NAMES,
            PRODUCT_DESCRIPTIONS,
        )

        image, _created = ProductImage.objects.update_or_create(
            product=product,
            order=0,
            defaults={"alt": PRODUCT_NAMES["en"]},
        )
        with SEED_IMAGE.open("rb") as image_file:
            image.image.save(SEED_IMAGE.name, File(image_file), save=True)

        self.stdout.write(
            self.style.SUCCESS(
                f"Baby seed OK: {len(categories)} categories, product {PRODUCT_SKU}."
            )
        )
