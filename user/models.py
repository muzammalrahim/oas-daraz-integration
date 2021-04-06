from django.db import models
from polymorphic.models import PolymorphicModel
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    class Meta:
        db_table = 'oas_user'


class Country(models.Model):
    name = models.CharField(max_length=191)
    code = models.CharField(max_length=191, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'oas_country'
        ordering = ['-updated_at']


class Profile(PolymorphicModel):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    company_name = models.CharField(max_length=191, unique=True)
    contact_person = models.CharField(max_length=191, blank=True, null=True)
    landline_phone = models.CharField(max_length=191, blank=True, null=True)
    mobile_Phone = models.CharField(max_length=191, blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        db_table = 'oas_user_profile'
        ordering = ['-updated_at']


class Supplier(Profile):
    email = models.EmailField(blank=True, null=True)

    class Meta:
        db_table = 'oas_suppliers'
        ordering = ['email','mobile_Phone','company_name','contact_person','landline_phone','country__name']


class Customer(Profile):
    bill_address_one = models.TextField(blank=True, null=True)
    bill_address_two = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'oas_customers'
        ordering = ['id','company_name','user__email','contact_person','country__name','landline_phone','mobile_Phone']


class Contact(PolymorphicModel):
    company_name = models.CharField(max_length=191)
    contact_person = models.CharField(max_length=191, blank=True, null=True)
    email = models.CharField(max_length=191)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    bill_address_one = models.TextField(blank=True, null=True)
    bill_address_two = models.TextField(blank=True, null=True)
    zip_code = models.CharField(max_length=191, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'oas_customer_contact'
        ordering = ['-updated_at']


class BillingContact(Contact):
    class Meta:
        db_table = 'oas_billing_contact'


class ShippingContact(Contact):
    class Meta:
        db_table = 'oas_shipping_contact'
