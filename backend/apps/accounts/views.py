from datetime import timedelta

from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.utils import timezone
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.catalog.models import Category, Product, Store
from apps.content.models import HomeBlock
from apps.leads.models import NewsletterSubscriber, WholesaleInquiry

from .models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "first_name", "last_name")


@staff_member_required(login_url="/api/admin/login/")
def analytics(request):
    recent_subscriber_cutoff = timezone.now() - timedelta(days=7)

    store_analytics = {}
    for store_value, store_name in Store.choices:
        store_products = Product.objects.filter(category__store=store_value)
        store_analytics[store_value] = {
            "name": store_name,
            "published_products": store_products.filter(is_published=True).count(),
            "unpublished_products": store_products.filter(is_published=False).count(),
            "categories": Category.objects.filter(store=store_value).count(),
        }

    context = admin.site.each_context(request)
    context.update({
        "store_analytics": store_analytics,
        "newsletter_total": NewsletterSubscriber.objects.count(),
        "newsletter_recent": NewsletterSubscriber.objects.filter(
            created_at__gte=recent_subscriber_cutoff
        ).count(),
        "wholesale_total": WholesaleInquiry.objects.count(),
        "recent_wholesale": WholesaleInquiry.objects.order_by("-created_at")[:5],
        "user_total": User.objects.count(),
        "staff_total": User.objects.filter(is_staff=True).count(),
        "home_block_total": HomeBlock.objects.count(),
    })
    return render(request, "admin/analytics.html", context)


class CurrentUserView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CurrentUserSerializer

    def get(self, request):
        return Response(CurrentUserSerializer(request.user).data)
