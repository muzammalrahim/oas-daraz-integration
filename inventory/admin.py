from django.contrib import admin
from inventory import models

# Register your models here.
admin.site.register(models.Manufacturer)
admin.site.register(models.ProductCategory)
admin.site.register(models.Inventory)
admin.site.register(models.Enquiry)
admin.site.register(models.ProductEnquiry)
admin.site.register(models.ProductRating)
