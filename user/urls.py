from django.conf.urls import url
from django.urls import re_path, path
from django.views.generic import RedirectView

from . import views

urlpatterns = [
    path("shop", views.user_panel, name="shop"),
    # url(r'^$', RedirectView.as_view(pattern_name='shop', permanent=False)),
    re_path(r'^shopadmin', views.admin_panel),
]