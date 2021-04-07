from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.get_products, name="daraz_products"),
    path('orders/', views.get_orders, name="daraz_orders"),
    path('order/', views.get_order, name="daraz_order"),
    path('login/', views.DarazCreateView.as_view(), name="daraz_login"),
    path('credentials/', views.DarazCredentialView.as_view(), name="daraz_credentials"),
    path('update/credentials/', views.DarazUpdateView.as_view(), name="daraz_credentials_update"),
]