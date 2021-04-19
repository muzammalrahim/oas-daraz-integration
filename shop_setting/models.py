from django.db import models
from PIL import Image
from io import BytesIO
import sys
from django.core.files.uploadedfile import InMemoryUploadedFile


class ShopSetting(models.Model):
    logo = models.ImageField(upload_to='logo', max_length=191, blank=True, null=True)
    featured_product = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'oas_shop_setting'


class Slider(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    btn_title = models.CharField(max_length=100)
    product = models.CharField(max_length=50, blank=True, null=True)
    external_link = models.URLField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to="sliders_img", blank=True, null=True)

    class Meta:
        db_table = 'oas_slider'

    def save(self, *args, **kwargs):
        if not self.id and self.image and self.image is not None:
            self.image = self.compressImage(self.image)
        super().save(*args, **kwargs)

    def compressImage(self, uploadedImage):
        imageTemproary = Image.open(uploadedImage)
        outputIoStream = BytesIO()
        # imageTemproaryResized = imageTemproary.resize( (1020,573) )
        if imageTemproary.mode in ("RGBA", "P"):
            imageTemproary = imageTemproary.convert("RGB")
        imageTemproary.save(outputIoStream, format='JPEG', quality=70)
        outputIoStream.seek(0)
        uploadedImage = InMemoryUploadedFile(outputIoStream, 'ImageField',
                                             "%s.jpg" % uploadedImage.name.split('.')[0],
                                             'image/jpeg', sys.getsizeof(outputIoStream), None)
        return uploadedImage

