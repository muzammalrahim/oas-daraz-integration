from tempfile import NamedTemporaryFile

from django.core.files import File
from django.db import models
from utils.utils import unique_slugify
from PIL import Image
from io import BytesIO
import sys
from django.core.files.uploadedfile import InMemoryUploadedFile
from urllib import request


class Manufacturer(models.Model):
    name = models.CharField(max_length=191)
    slug = models.SlugField(max_length=191, blank=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'oas_manufacturers'
        ordering = ['name', 'slug', 'created_at', '-updated_at']

    def save(self, *args, **kwargs):
        value = self.name
        unique_slugify(self, value)
        super().save(*args, **kwargs)


class ProductCategory(models.Model):
    name = models.CharField(max_length=191)
    slug = models.SlugField(max_length=191, blank=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'oas_product_category'
        ordering = ['name','slug','created_at','-updated_at']

    def save(self, *args, **kwargs):
        value = self.name
        unique_slugify(self, value)
        super().save(*args, **kwargs)


class Inventory(models.Model):
    part_number = models.CharField(max_length=50, blank=True, null=True)
    alt_part_number = models.CharField(max_length=50, blank=True, null=True)
    short_description = models.TextField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    CONDITION_CHOICES = (
        ('NE', 'NE'),
        ('NS', 'NS'),
        ('SV', 'SV'),
        ('AR', 'AR'),
        ('FN', 'FN'),
        ('US', 'US'),
        ('RP', 'RP'),
    )
    condition = models.CharField(max_length=5, blank=True, null=True)
    quantity = models.IntegerField(default=0)
    tag_date = models.CharField(max_length=20, blank=True, null=True)
    turn_around_time = models.TextField(blank=True, null=True)
    HAZMAT_CHOICES = (
        ('Yes', 'Yes'),
        ('No', 'No')
    )
    hazmat = models.CharField(choices=HAZMAT_CHOICES, max_length=5, blank=True, null=True)
    un_code = models.CharField(max_length=191, null=True, blank=True)
    stock_location = models.CharField(max_length=191, null=True, blank=True)
    product_title = models.CharField(max_length=191, null=True, blank=True)
    certification = models.TextField(blank=True, null=True)
    unit_price = models.CharField(max_length=10, blank=True, null=True)
    UOM_CHOICES = (
        ('CM', 'CM'),
        ('BOX', 'BOX'),
        ('KG', 'KG'),
    )
    unit_of_measure = models.CharField(choices=UOM_CHOICES, max_length=5, blank=True, null=True)
    # HOT_SALE_CHOICES = (
    #     ('Yes', 'Yes'),
    #     ('No', 'No')
    # )
    # hot_sale_item = models.CharField(choices=HOT_SALE_CHOICES, max_length=5, blank=True, null=True)
    product_image = models.ImageField(max_length=191, blank=True, null=True)
    supplier = models.ForeignKey('user.Supplier', on_delete=models.SET_NULL, blank=True, null=True)
    product_category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, blank=True, null=True)
    product_manufacturer = models.ForeignKey(Manufacturer, on_delete=models.SET_NULL, blank=True, null=True)
    status = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    best_seller = models.BooleanField(default=False)
    featured_product = models.BooleanField(default=False)
    daraz_product = models.BooleanField(default=False)
    daraz_id = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.id and self.product_image and self.product_image is not None:
            if self.daraz_product:
                url = self.product_image.url.replace("/media/https%3A", 'https:/')
                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(request.urlopen(url).read())
                img_temp.flush()
                img = File(img_temp)
            else:
                img = self.product_image
            self.product_image = self.compressImage(img)
        super().save(*args, **kwargs)

    def compressImage(self,uploadedImage):
        imageTemproary = Image.open(uploadedImage)
        outputIoStream = BytesIO()
        # imageTemproaryResized = imageTemproary.resize( (1020,573) ) 
        if imageTemproary.mode in ("RGBA", "P"):
            imageTemproary = imageTemproary.convert("RGB")
        imageTemproary.save(outputIoStream , format='JPEG', quality=70)
        outputIoStream.seek(0)
        uploadedImage = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.jpg" % uploadedImage.name.split('.')[0], 'image/jpeg', sys.getsizeof(outputIoStream), None)
        return uploadedImage

    class Meta:
        db_table = 'oas_inventory'
        ordering = ['quantity','product_title','description','condition','hazmat','unit_price','part_number','status','-created_at','-updated_at']


class Enquiry(models.Model):
    part_number = models.ManyToManyField(Inventory, through="ProductEnquiry")
    company = models.ForeignKey('user.Customer', on_delete=models.SET_NULL, blank=True, null=True,
                                related_name='company_customer')
    customer = models.ForeignKey('user.Customer', on_delete=models.SET_NULL, blank=True, null=True,)
                                    #    related_name='contact_person_customer')
    email_address = models.CharField(max_length=191)
    phone_number = models.CharField(max_length=191, blank=True, null=True)
    country = models.ForeignKey('user.Country', on_delete=models.SET_NULL, blank=True, null=True)
    STATUS_CHOICES = (
        ('FULFILLED','FULFILLED'),
        ('IN PROGRESS','IN PROGRESS'),
        ('CANCELLED','CANCELLED'),
    )
    status = models.CharField(choices=STATUS_CHOICES, max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'oas_enquiries'
        ordering = ['part_number__part_number','company','email_address','phone_number','country__name','status','-created_at','-updated_at']

class ProductEnquiry(models.Model):
    enquiry = models.ForeignKey(Enquiry, on_delete=models.SET_NULL,blank=True, null=True)
    part_number = models.ForeignKey(Inventory, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'oas_productenquiries'
        ordering = ['enquiry__status','part_number__part_number','-created_at','-updated_at']
