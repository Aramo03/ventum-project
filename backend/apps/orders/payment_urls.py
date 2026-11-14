from django.urls import path

from .checkout import checkout_view
from .idram import idram_result

urlpatterns = [
    path("checkout/", checkout_view, name="checkout"),
    path("payments/idram/result/", idram_result, name="idram-result"),
]
