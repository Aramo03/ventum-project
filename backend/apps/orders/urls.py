from django.urls import path
from .views import order_detail_view

urlpatterns = [
    path('<str:bill_no>/', order_detail_view, name='order-detail'),
]