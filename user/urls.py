from django.conf.urls import url
from django.urls import re_path, path
from django.views.generic import RedirectView

from . import views

urlpatterns = [
    re_path(r'^shopadmin', views.admin_panel),
    re_path(r"^shop", views.user_panel, name="shop"),
    url(r'^$', RedirectView.as_view(pattern_name='shop', permanent=False)),
]