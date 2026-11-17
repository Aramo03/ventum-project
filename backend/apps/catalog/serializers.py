from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from apps.core.translations import pick_translation

from .models import Category, Product, ProductImage


def translated_value(rows, language, field):
    row = pick_translation(rows, language)
    if row is None:
        return ""
    return getattr(row, field)


def absolute_media_url(request, file_field):
    if not file_field:
        return None
    url = file_field.url
    if request is None:
        return url
    return request.build_absolute_uri(url)


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    parent = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ("slug", "store", "name", "parent")

    @extend_schema_field(serializers.CharField())
    def get_name(self, category):
        return translated_value(
            category.translations.all(),
            self.context["language"],
            "name",
        )

    @extend_schema_field(serializers.CharField(allow_null=True))
    def get_parent(self, category):
        if category.parent_id is None:
            return None
        return category.parent.slug


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ("url", "alt", "order")

    @extend_schema_field(serializers.CharField(allow_null=True))
    def get_url(self, image):
        return absolute_media_url(self.context.get("request"), image.image)


class ProductListSerializer(serializers.ModelSerializer):
    store = serializers.CharField(source="category.store", read_only=True)
    name = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ("sku", "store", "price", "name", "category", "image")

    @extend_schema_field(serializers.CharField())
    def get_name(self, product):
        return translated_value(
            product.translations.all(),
            self.context["language"],
            "name",
        )

    @extend_schema_field(
        {
            "type": "object",
            "properties": {
                "slug": {"type": "string"},
                "name": {"type": "string"},
            },
            "required": ["slug", "name"],
        }
    )
    def get_category(self, product):
        category = product.category
        return {
            "slug": category.slug,
            "name": translated_value(
                category.translations.all(),
                self.context["language"],
                "name",
            ),
        }

    @extend_schema_field(serializers.CharField(allow_null=True))
    def get_image(self, product):
        image = next(iter(product.images.all()), None)
        if image is None:
            return None
        return absolute_media_url(self.context.get("request"), image.image)


class ProductDetailSerializer(ProductListSerializer):
    description = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + ("description", "images")

    @extend_schema_field(serializers.CharField())
    def get_description(self, product):
        return translated_value(
            product.translations.all(),
            self.context["language"],
            "description",
        )
