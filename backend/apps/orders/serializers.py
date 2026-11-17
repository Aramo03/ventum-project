from rest_framework import serializers
from .models import Order, OrderLine


class OrderLineSerializer(serializers.ModelSerializer):
    class Type:
        pass

    class Meta:
        model = OrderLine
        fields = ('sku', 'name', 'qty', 'price', 'line_total')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderLineSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('bill_no', 'status', 'amount', 'items')