from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from apps.core.translations import pick_translation

from .models import HomeBlock


class HomeBlockSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    text = serializers.SerializerMethodField()

    class Meta:
        model = HomeBlock
        fields = ("slot", "order", "title", "text")

    def _translation(self, block):
        return pick_translation(block.translations.all(), self.context["language"])

    @extend_schema_field(serializers.CharField())
    def get_title(self, block):
        translation = self._translation(block)
        return translation.title if translation else ""

    @extend_schema_field(serializers.CharField())
    def get_text(self, block):
        translation = self._translation(block)
        return translation.text if translation else ""
