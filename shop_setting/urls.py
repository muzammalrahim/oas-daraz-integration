from django.urls import path

from . import views

urlpatterns = [
    path("", views.GetShopSetting.as_view(), name="get_shop_setting"),
    path("create/", views.CreateShopSetting.as_view(), name="create_shop_setting"),
]