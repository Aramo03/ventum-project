from django.urls import path
from .views import NewsletterCreateView, WholesaleCreateView

urlpatterns = [
    path('newsletter/', NewsletterCreateView.as_view(), name='newsletter-create'),
    path('wholesale/', WholesaleCreateView.as_view(), name='wholesale-create'),
]