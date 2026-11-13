from decimal import Decimal
from django.core.management.base import BaseCommand
from apps.catalog.models import Category, Product, ProductImage


class Command(BaseCommand):
    help = "Seeds initial categories and products for the Textile store without touching Baby store data."

    def handle(self, *args, **options):
        self.stdout.write("Seeding Textile store data...")

        # 1. Կատեգորիաների ստեղծում կամ թարմացում (store=textile)
        categories_data = [
            {
                "slug": "textile-bedding",
                "defaults": {
                    "store": "textile",
                    "name_am": "Անկողնային պարագաներ",
                    "name_en": "Bedding Sets",
                    "name_ru": "Постельное белье",
                },
            },
            {
                "slug": "textile-fabrics",
                "defaults": {
                    "store": "textile",
                    "name_am": "Գործվածքներ և կտորներ",
                    "name_en": "Fabrics & Textiles",
                    "name_ru": "Ткани и текстиль",
                },
            },
        ]

        created_categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.update_or_create(
                slug=cat_data["slug"], defaults=cat_data["defaults"]
            )
            created_categories[cat_data["slug"]] = category
            action = "Created" if created else "Updated"
            self.stdout.write(f"  - Category '{category.slug}': {action}")

        # 2. Հրապարակված ապրանքի ստեղծում կամ թարմացում
        product_sku = "TXT-BED-001"
        bedding_category = created_categories["textile-bedding"]

        product, prod_created = Product.objects.update_or_create(
            sku=product_sku,
            defaults={
                "category": bedding_category,
                "price": Decimal("15000.00"),
                "is_published": True,
                "name_am": "Պրեմիում բամբակե անկողնային հավաքածու",
                "name_en": "Premium Cotton Bedding Set",
                "name_ru": "Премиальный хлопковый комплект постельного белья",
                "description_am": "Բարձր որակի բամբակից պատրաստված հարմարավետ և փափուկ անկողնային հավաքածու Ventum Textile-ից:",
                "description_en": "Comfortable and soft bedding set made of high-quality cotton from Ventum Textile.",
                "description_ru": "Комфортный и мягкий комплект постельного белья из высококачественного хлопка от Ventum Textile.",
            },
        )

        prod_action = "Created" if prod_created else "Updated"
        self.stdout.write(f"  - Product '{product.sku}': {prod_action}")

        # 3. Նկարի ավելացում
        image_path = "products/textile_sample.jpg"
        ProductImage.objects.get_or_create(
            product=product,
            alt="Ventum Textile Sample Product",
            defaults={"order": 0, "image": image_path},
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully seeded textile data without altering baby records!"
            )
        )