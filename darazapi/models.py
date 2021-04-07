from django.db import models

from user.models import User


class Daraz(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True, related_name="daraz")
    userId = models.CharField(max_length=255)
    api_key = models.CharField(max_length=500)
    active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'daraz_credentials'
