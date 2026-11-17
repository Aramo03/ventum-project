from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import (
    Category,
    CategoryTranslation,
    Product,
    ProductImage,
    ProductTranslation,
    Store,
)


class CategoryTranslationInline(TabularInline):
    model = CategoryTranslation
    extra = 0
    min_num = 3
    max_num = 3
    fields = ("language", "name")


class ProductTranslationInline(TabularInline):
    model = ProductTranslation
    extra = 0
    min_num = 3
    max_num = 3
    fields = ("language", "name", "description")


class ProductImageInline(TabularInline):
    model = ProductImage
    extra = 0
    fields = ("image", "alt", "order")


class ProductStoreFilter(admin.SimpleListFilter):
    """List filter titled ``store``. Products inherit the shop from their category."""

    title = "store"
    parameter_name = "store"

    def lookups(self, request, model_admin):
        return Store.choices

    def queryset(self, request, queryset):
        value = self.value()
        if value in Store.values:
            return queryset.filter(category__store=value)
        return queryset


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ("slug", "store", "parent")
    list_display_links = ("slug",)
    list_filter = ("store",)
    search_fields = ("slug", "translations__name")
    autocomplete_fields = ("parent",)
    inlines = [CategoryTranslationInline]


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ("sku", "category", "store", "price", "is_published")
    list_display_links = ("sku",)
    list_filter = (ProductStoreFilter, "is_published")
    search_fields = ("sku", "translations__name", "translations__description")
    autocomplete_fields = ("category",)
    inlines = [ProductTranslationInline, ProductImageInline]

    @admin.display(description="Store", ordering="category__store")
    def store(self, obj):
        return obj.category.get_store_display()
