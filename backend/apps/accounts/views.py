from datetime import timedelta

from django.conf import settings
from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.shortcuts import render
from django.utils import timezone
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.catalog.models import Category, Product, Store
from apps.content.models import HomeBlock
from apps.leads.models import NewsletterSubscriber, WholesaleInquiry

from .models import User
from .serializers import GoogleCredentialSerializer, RegisterSerializer


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


class RegisterThrottle(AnonRateThrottle):
    scope = "register"


class GoogleLoginThrottle(AnonRateThrottle):
    scope = "google_login"


def token_pair(user):
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}


def coded_error(code, messages, status):
    if isinstance(messages, str):
        messages = [messages]
    return Response({"code": code, "messages": list(messages)}, status=status)


def claim_name(value):
    if not isinstance(value, str):
        return ""
    return value.strip()[:150]


class RegisterView(APIView):
    permission_classes = (AllowAny,)
    throttle_classes = (RegisterThrottle,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = User.objects.normalize_email(serializer.validated_data["email"])
        password = serializer.validated_data["password"]
        password_confirm = serializer.validated_data["password_confirm"]
        first_name = serializer.validated_data.get("first_name", "")
        last_name = serializer.validated_data.get("last_name", "")

        if password != password_confirm:
            return coded_error("password_mismatch", "Passwords do not match.", 400)

        if User.objects.filter(email__iexact=email).exists():
            return coded_error("email_taken", "An account with this email already exists.", 400)

        candidate = User(email=email, first_name=first_name, last_name=last_name)
        try:
            validate_password(password, user=candidate)
        except DjangoValidationError as exc:
            return coded_error("invalid_password", exc.messages, 400)

        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        return Response(token_pair(user), status=201)


class GoogleLoginView(APIView):
    permission_classes = (AllowAny,)
    throttle_classes = (GoogleLoginThrottle,)

    def post(self, request):
        client_id = settings.GOOGLE_CLIENT_ID
        if not client_id:
            return coded_error("google_unavailable", "Google sign-in is not configured.", 503)

        serializer = GoogleCredentialSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            identity = id_token.verify_oauth2_token(
                serializer.validated_data["credential"],
                google_requests.Request(),
                client_id,
            )
        except Exception:
            return coded_error("google_invalid", "Google credential could not be verified.", 400)

        if not isinstance(identity, dict):
            return coded_error("google_invalid", "Google credential could not be verified.", 400)

        email = identity.get("email")
        if not isinstance(email, str) or not email.strip() or identity.get("email_verified") is not True:
            return coded_error(
                "google_email_unverified",
                "Google did not provide a verified email address.",
                400,
            )

        email = User.objects.normalize_email(email)
        user = User.objects.filter(email__iexact=email).first()
        if user is None:
            user = User.objects.create_user(
                email=email,
                password=None,
                first_name=claim_name(identity.get("given_name")),
                last_name=claim_name(identity.get("family_name")),
            )
            user.set_unusable_password()
            user.save(update_fields=["password"])

        return Response(token_pair(user), status=200)
