from drf_spectacular.utils import OpenApiParameter, extend_schema, extend_schema_view
from rest_framework import generics
from rest_framework.exceptions import ValidationError

from apps.core.translations import parse_language

from .models import Category, Product, Store
from .search import search_products
from .serializers import CategorySerializer, ProductDetailSerializer, ProductListSerializer

_LANGUAGE_PARAMETER = OpenApiParameter(
    name="language",
    type=str,
    location=OpenApiParameter.QUERY,
    required=False,
    description="Content language. Blank means English.",
)
_STORE_PARAMETER = OpenApiParameter(
    name="store",
    type=str,
    location=OpenApiParameter.QUERY,
    required=False,
    enum=list(Store.values),
    description="textile or baby. Omit to include both stores.",
)
_QUERY_PARAMETER = OpenApiParameter(
    name="q",
    type=str,
    location=OpenApiParameter.QUERY,
    required=False,
    description="Match sku or translated name. Blank returns the full page.",
)


class CatalogLanguageMixin:
    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        try:
            request.catalog_language = parse_language(request.query_params.get("language"))
        except ValueError as exc:
            raise ValidationError({"language": exc.args[0]}) from exc

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["language"] = self.request.catalog_language
        return context


def requested_store(request):
    raw = request.query_params.get("store")
    if raw is None or not str(raw).strip():
        return None
    if raw not in Store.values:
        raise ValidationError({"store": "Store must be textile or baby."})
    return raw


@extend_schema_view(
    get=extend_schema(tags=["catalog"], parameters=[_STORE_PARAMETER, _LANGUAGE_PARAMETER])
)
class CategoryListView(CatalogLanguageMixin, generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        store = requested_store(self.request)
        queryset = Category.objects.select_related("parent").prefetch_related("translations")
        if store is not None:
            queryset = queryset.filter(store=store)
        return queryset


@extend_schema_view(
    get=extend_schema(
        tags=["catalog"],
        parameters=[_STORE_PARAMETER, _LANGUAGE_PARAMETER, _QUERY_PARAMETER],
    )
)
class ProductListView(CatalogLanguageMixin, generics.ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        store = requested_store(self.request)
        queryset = (
            Product.objects.filter(is_published=True)
            .select_related("category")
            .prefetch_related("translations", "images", "category__translations")
        )
        if store is not None:
            queryset = queryset.filter(category__store=store)
        return search_products(queryset, self.request.query_params.get("q", ""))


@extend_schema_view(
    get=extend_schema(tags=["catalog"], parameters=[_LANGUAGE_PARAMETER])
)
class ProductDetailView(CatalogLanguageMixin, generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    lookup_field = "sku"
    queryset = Product.objects.filter(is_published=True)

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .select_related("category")
            .prefetch_related("translations", "images", "category__translations")
        )
