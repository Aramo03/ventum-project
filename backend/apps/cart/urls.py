from django.urls import path

from .views import CartDetailView, CartItemDetailView, CartItemListView

urlpatterns = [
    path("", CartDetailView.as_view(), name="cart-detail"),
    path("items/", CartItemListView.as_view(), name="cart-items"),
    path("items/<str:sku>/", CartItemDetailView.as_view(), name="cart-item-detail"),
]
