from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.get_products, name="daraz_products"),
    path('orders/', views.get_orders, name="daraz_orders"),
    path('order/', views.get_order, name="daraz_order"),
]