from django.urls import path

from . import views


urlpatterns = [
    path("", views.get_returned_response, name="returned_response"),
    path('mobile_transaction/', views.jazz_cash_payment, name="mobile_transaction"),
    path("card_payment/", views.card_payment, name="card_payment"),
    path("mobile_account/", views.mobile_account_payment, name="mobile_account"),
]