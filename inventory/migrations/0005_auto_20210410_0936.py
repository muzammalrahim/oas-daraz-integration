# Generated by Django 3.1.5 on 2021-04-10 04:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_auto_20210409_1804'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productimages',
            old_name='product_image',
            new_name='image',
        ),
    ]
