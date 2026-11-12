from rest_framework import serializers
from .models import NewsletterSubscriber, WholesaleInquiry


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["email", "created_at"]
        read_only_fields = ["created_at"]

    def validate_email(self, value):
        if NewsletterSubscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return value


class WholesaleInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = WholesaleInquiry
        fields = ["id", "name", "phone", "email", "text", "created_at"]
        read_only_fields = ["id", "created_at"]
