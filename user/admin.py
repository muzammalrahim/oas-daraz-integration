from django.contrib import admin
from user import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Country)
admin.site.register(models.Customer)
admin.site.register(models.Supplier)
admin.site.register(models.BillingContact)
admin.site.register(models.ShippingContact)