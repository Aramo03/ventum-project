from decimal import Decimal

from rest_framework import serializers

from apps.core.translations import pick_translation


def money(value):
    return format(Decimal(value).quantize(Decimal("0.01")), ".2f")


def cart_representation(cart, language):
    items = []
    total = Decimal("0.00")
    count = 0
    rows = cart.items.select_related("product__category").prefetch_related(
        "product__translations"
    )
    for item in rows:
        product = item.product
        price = Decimal(product.price).quantize(Decimal("0.01"))
        line_total = (price * item.qty).quantize(Decimal("0.01"))
        total += line_total
        count += item.qty
        translation = pick_translation(product.translations.all(), language)
        items.append(
            {
                "sku": product.sku,
                "name": translation.name if translation else "",
                "store": product.category.store,
                "qty": item.qty,
                "price": money(price),
                "line_total": money(line_total),
            }
        )
    return {"count": count, "total": money(total), "items": items}


class AddCartItemSerializer(serializers.Serializer):
    sku = serializers.CharField(max_length=64)
    qty = serializers.IntegerField(min_value=1)


class UpdateCartItemSerializer(serializers.Serializer):
    qty = serializers.IntegerField(min_value=0)
