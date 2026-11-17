from django.db import transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.catalog.models import Product
from apps.core.translations import parse_language

from .models import Cart, CartItem
from .serializers import CartItemWriteSerializer, serialize_cart


def _language_from_request(request):
    raw = (
        request.query_params.get("language")
        or request.data.get("language")
        or request.headers.get("Accept-Language", "en").split(",", 1)[0].split("-", 1)[0]
    )
    return parse_language(raw)


def _get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


class CartDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            language = _language_from_request(request)
        except ValueError:
            return Response({"detail": "Unsupported language."}, status=400)
        cart = _get_or_create_cart(request.user)
        return Response(serialize_cart(cart, language))


class CartItemListView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            language = _language_from_request(request)
        except ValueError:
            return Response({"detail": "Unsupported language."}, status=400)

        serializer = CartItemWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        sku = serializer.validated_data["sku"]
        qty = serializer.validated_data["qty"]
        if qty < 1:
            return Response({"detail": "Quantity must be at least 1."}, status=400)

        product = Product.objects.filter(sku=sku, is_published=True).first()
        if product is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():
            cart = _get_or_create_cart(request.user)
            item, created = CartItem.objects.select_for_update().get_or_create(
                cart=cart,
                product=product,
                defaults={"qty": qty},
            )
            if not created:
                item.qty += qty
                item.save(update_fields=("qty",))

        return Response(serialize_cart(cart, language), status=status.HTTP_200_OK)


class CartItemDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def patch(self, request, sku):
        try:
            language = _language_from_request(request)
        except ValueError:
            return Response({"detail": "Unsupported language."}, status=400)

        qty = request.data.get("qty")
        try:
            qty = int(qty)
        except (TypeError, ValueError):
            return Response({"detail": "Invalid quantity."}, status=400)
        if qty < 0:
            return Response({"detail": "Invalid quantity."}, status=400)

        with transaction.atomic():
            cart = _get_or_create_cart(request.user)
            item = (
                CartItem.objects.select_for_update()
                .filter(cart=cart, product__sku=sku)
                .first()
            )
            if item is None:
                return Response(status=status.HTTP_404_NOT_FOUND)
            if qty == 0:
                item.delete()
            else:
                item.qty = qty
                item.save(update_fields=("qty",))

        return Response(serialize_cart(cart, language))

    def delete(self, request, sku):
        with transaction.atomic():
            cart = _get_or_create_cart(request.user)
            deleted, _ = CartItem.objects.filter(cart=cart, product__sku=sku).delete()
            if not deleted:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
