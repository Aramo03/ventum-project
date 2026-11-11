from django.db.models import Q

from apps.core.languages import LANGUAGE_CODES


def search_products(queryset, query):
    """
    Search products by SKU or translated name.

    Future API contract:
    GET /api/products/?q=&store=&language=

    Searches in Armenian (am), English (en), and Russian (ru).
    Search is case-insensitive.

    Returns the original queryset if the query is empty
    or contains only whitespace.
    """
    if not query or not query.strip():
        return queryset

    query = query.strip()

    return queryset.filter(
        Q(sku__icontains=query)
        | Q(
            translations__name__icontains=query,
            translations__language__in=LANGUAGE_CODES,
        )
    ).distinct()
