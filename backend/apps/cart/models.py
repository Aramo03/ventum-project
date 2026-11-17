from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models


class Cart(models.Model):
    """The one open cart for a user. Line prices stay on the product until checkout."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cart",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Carts"

    def __str__(self):
        return f"Cart for {self.user}"


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items",
    )
    product = models.ForeignKey(
        "catalog.Product",
        on_delete=models.PROTECT,
        related_name="cart_items",
    )
    qty = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    class Meta:
        ordering = ("id",)
        verbose_name = "Cart item"
        verbose_name_plural = "Cart items"
        constraints = [
            models.UniqueConstraint(
                fields=("cart", "product"),
                name="unique_cart_product",
            ),
        ]

    def __str__(self):
        return f"{self.product} × {self.qty}"
