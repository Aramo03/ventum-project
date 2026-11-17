from decimal import Decimal

from rest_framework import serializers

from apps.core.translations import parse_language, pick_translation


def _money(value):
    return format(Decimal(value).quantize(Decimal("0.01")), ".2f")


def serialize_cart(cart, language):
    language = parse_language(language)
    items_payload = []
    count = 0
    total = Decimal("0.00")

    items = (
        cart.items.select_related("product", "product__category")
        .prefetch_related("product__translations")
        .all()
    )
    for item in items:
        product = item.product
        qty = int(item.qty)
        price = Decimal(product.price).quantize(Decimal("0.01"))
        line_total = (price * qty).quantize(Decimal("0.01"))
        translation = pick_translation(list(product.translations.all()), language)
        name = translation.name if translation else product.sku
        items_payload.append(
            {
                "sku": product.sku,
                "name": name,
                "store": product.category.store,
                "qty": qty,
                "price": _money(price),
                "line_total": _money(line_total),
            }
        )
        count += qty
        total += line_total

    return {
        "count": count,
        "total": _money(total),
        "items": items_payload,
    }


class CartItemWriteSerializer(serializers.Serializer):
    sku = serializers.CharField(max_length=64)
    qty = serializers.IntegerField()
