from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail_view(request, bill_no):
    try:
        order = Order.objects.get(bill_no=bill_no, user=request.user)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = OrderSerializer(order)
    return Response(serializer.data)