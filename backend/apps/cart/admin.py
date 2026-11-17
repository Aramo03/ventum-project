from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import Cart, CartItem


class CartItemInline(TabularInline):
    model = CartItem
    extra = 0
    fields = ("product", "qty")
    autocomplete_fields = ("product",)


@admin.register(Cart)
class CartAdmin(ModelAdmin):
    list_display = ("user", "created_at")
    search_fields = ("user__email",)
    inlines = [CartItemInline]
