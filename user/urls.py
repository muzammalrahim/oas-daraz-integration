from django.urls import re_path, path
from . import views

urlpatterns = [
    path("", views.user_panel),
    re_path(r'^shopadmin', views.admin_panel),
]