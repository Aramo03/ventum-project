from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView

from apps.core.translations import parse_language

from .models import HomeBlock
from .serializers import HomeBlockSerializer


class HomeBlockListView(ListAPIView):
    serializer_class = HomeBlockSerializer
    pagination_class = None

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        try:
            request.home_block_language = parse_language(
                request.query_params.get("language")
            )
        except ValueError as exc:
            raise ValidationError({"language": exc.args[0]}) from exc

    @extend_schema(
        tags=["content"],
        parameters=[
            OpenApiParameter(
                name="language",
                type=str,
                location=OpenApiParameter.QUERY,
                required=False,
                description="Content language. Blank means English.",
            )
        ],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return HomeBlock.objects.prefetch_related("translations").order_by("order", "id")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["language"] = self.request.home_block_language
        return context
