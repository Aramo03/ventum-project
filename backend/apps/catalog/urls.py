from django.urls import path

from .views import CategoryListView, ProductDetailView, ProductListView

urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="catalog-category-list"),
    path("products/", ProductListView.as_view(), name="catalog-product-list"),
    path("products/<str:sku>/", ProductDetailView.as_view(), name="catalog-product-detail"),
]
