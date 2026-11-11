from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models

from apps.core.models import BaseTranslation


class Store(models.TextChoices):
    TEXTILE = "textile", "Textile"
    BABY = "baby", "Baby"


class Category(models.Model):
    """One catalog tree for both shops. ``store`` is exactly ``textile`` or ``baby``."""

    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="children",
    )
    store = models.CharField(max_length=16, choices=Store.choices, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        ordering = ("store", "slug")
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(store__in=Store.values),
                name="category_store_is_textile_or_baby",
            ),
        ]

    def __str__(self):
        return self.slug


class CategoryTranslation(BaseTranslation):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="translations",
    )
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ("language",)
        verbose_name = "Category translation"
        verbose_name_plural = "Category translations"
        constraints = [
            models.UniqueConstraint(
                fields=("category", "language"),
                name="unique_category_translation_language",
            ),
        ]

    def __str__(self):
        return f"{self.category} — {self.language}"


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0"))],
        verbose_name="Price (AMD)",
        help_text="Price in AMD.",
    )
    sku = models.CharField(max_length=64, unique=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ("sku",)
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.sku


class ProductTranslation(BaseTranslation):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="translations",
    )
    name = models.CharField(max_length=255)
    description = models.TextField()

    class Meta:
        ordering = ("language",)
        verbose_name = "Product translation"
        verbose_name_plural = "Product translations"
        constraints = [
            models.UniqueConstraint(
                fields=("product", "language"),
                name="unique_product_translation_language",
            ),
        ]

    def __str__(self):
        return f"{self.product} — {self.language}"


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="catalog/products/")
    alt = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("order", "id")
        verbose_name = "Product image"
        verbose_name_plural = "Product images"

    def __str__(self):
        return f"{self.product} #{self.order}"
