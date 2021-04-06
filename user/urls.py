from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^oxyadmin', views.admin_panel),
]