from decimal import Decimal
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from apps.catalog.models import (
    Category,
    CategoryTranslation,
    Product,
    ProductImage,
    ProductTranslation,
)
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


def _upsert_category_translations(category, names):
    for language in LANGUAGE_CODES:
        CategoryTranslation.objects.update_or_create(
            category=category,
            language=language,
            defaults={"name": names[language]},
        )


def _upsert_product_translations(product, names, descriptions):
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
        if not SEED_IMAGE.is_file():
            raise CommandError(f"Seed image not found: {SEED_IMAGE}")

        categories = []
        for spec in CATEGORIES:
            existing = Category.objects.filter(slug=spec["slug"]).first()
            if existing is not None and existing.store != BABY_STORE:
                raise CommandError(
                    f"Refusing to change store for existing slug {spec['slug']} "
                    f"(store={existing.store})."
                )
            category, _created = Category.objects.update_or_create(
                slug=spec["slug"],
                defaults={"store": BABY_STORE},
            )
            _upsert_category_translations(category, spec["names"])
            categories.append(category)

        primary_category = categories[0]
        existing_product = (
            Product.objects.filter(sku=PRODUCT_SKU).select_related("category").first()
        )
        if (
            existing_product is not None
            and existing_product.category.store != BABY_STORE
        ):
            raise CommandError(
                f"SKU {PRODUCT_SKU} belongs to "
                f"store={existing_product.category.store}; not overwriting."
            )
        product, _created = Product.objects.update_or_create(
            sku=PRODUCT_SKU,
            defaults={
                "category": primary_category,
                "price": PRODUCT_PRICE,
                "is_published": True,
            },
        )
        _upsert_product_translations(product, PRODUCT_NAMES, PRODUCT_DESCRIPTIONS)

        image, _created = ProductImage.objects.update_or_create(
            product=product,
            order=0,
            defaults={"alt": PRODUCT_NAMES["en"]},
        )
        if not image.image:
            with SEED_IMAGE.open("rb") as image_file:
                image.image.save(SEED_IMAGE.name, File(image_file), save=True)

        self.stdout.write(
            self.style.SUCCESS(
                f"Baby seed OK: {len(categories)} categories, product {PRODUCT_SKU}."
            )
        )
