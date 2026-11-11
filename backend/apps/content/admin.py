from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import HomeBlock, HomeBlockTranslation


class HomeBlockTranslationInline(TabularInline):
    model = HomeBlockTranslation
    extra = 0
    min_num = 3
    max_num = 3
    fields = ("language", "title", "text")


@admin.register(HomeBlock)
class HomeBlockAdmin(ModelAdmin):
    list_display = ("slot", "order")
    list_display_links = ("slot",)
    list_editable = ("order",)
    list_filter = ("slot",)
    ordering = ("order",)
    search_fields = ("translations__title", "translations__text")
    inlines = [HomeBlockTranslationInline]
