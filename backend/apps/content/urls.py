from django.urls import path

from .views import HomeBlockListView


urlpatterns = [
    path("home-blocks/", HomeBlockListView.as_view(), name="home-block-list"),
]
