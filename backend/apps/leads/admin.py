from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import NewsletterSubscriber, WholesaleInquiry


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)


@admin.register(WholesaleInquiry)
class WholesaleInquiryAdmin(ModelAdmin):
    list_display = ("name", "email", "phone", "created_at")
    search_fields = ("name", "email", "phone")
    list_filter = ("created_at",)