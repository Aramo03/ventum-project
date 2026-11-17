from django.db import transaction
from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.catalog.models import Product
from apps.core.translations import parse_language

from .models import Cart, CartItem
from .serializers import (
    AddCartItemSerializer,
    UpdateCartItemSerializer,
    cart_representation,
)

_LANGUAGE_PARAMETER = OpenApiParameter(
    name="language",
    type=str,
    location=OpenApiParameter.QUERY,
    required=False,
    description="Content language. Blank means English.",
)


class CartLanguageMixin:
    permission_classes = (IsAuthenticated,)

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        try:
            request.cart_language = parse_language(request.query_params.get("language"))
        except ValueError as exc:
            raise ValidationError({"language": exc.args[0]}) from exc


def published_product(sku):
    return get_object_or_404(Product.objects.select_related("category"), sku=sku, is_published=True)


def empty_cart():
    return {"count": 0, "total": "0.00", "items": []}


class CartView(CartLanguageMixin, APIView):
    @extend_schema(tags=["cart"], parameters=[_LANGUAGE_PARAMETER])
    def get(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if cart is None:
            return Response(empty_cart())
        return Response(cart_representation(cart, request.cart_language))


class CartItemCreateView(CartLanguageMixin, APIView):
    @extend_schema(tags=["cart"], parameters=[_LANGUAGE_PARAMETER])
    def post(self, request):
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = published_product(serializer.validated_data["sku"])
        qty = serializer.validated_data["qty"]
        with transaction.atomic():
            cart, _created = Cart.objects.select_for_update().get_or_create(user=request.user)
            item = (
                CartItem.objects.select_for_update()
                .filter(cart=cart, product=product)
                .first()
            )
            if item is None:
                CartItem.objects.create(cart=cart, product=product, qty=qty)
            else:
                item.qty += qty
                item.save(update_fields=("qty",))
        return Response(cart_representation(cart, request.cart_language))


class CartItemDetailView(CartLanguageMixin, APIView):
    @extend_schema(tags=["cart"], parameters=[_LANGUAGE_PARAMETER])
    def patch(self, request, sku):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        qty = serializer.validated_data["qty"]
        with transaction.atomic():
            cart = Cart.objects.select_for_update().filter(user=request.user).first()
            item = _locked_item(cart, sku)
            if qty == 0:
                item.delete()
            else:
                item.qty = qty
                item.save(update_fields=("qty",))
        return Response(cart_representation(cart, request.cart_language))

    @extend_schema(tags=["cart"], parameters=[_LANGUAGE_PARAMETER])
    def delete(self, request, sku):
        with transaction.atomic():
            cart = Cart.objects.select_for_update().filter(user=request.user).first()
            _locked_item(cart, sku).delete()
        return Response(status=204)


def _locked_item(cart, sku):
    if cart is None:
        raise Http404
    return get_object_or_404(
        CartItem.objects.select_for_update().select_related("product"),
        cart=cart,
        product__sku=sku,
    )
