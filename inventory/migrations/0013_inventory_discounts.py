# Generated by Django 3.1.5 on 2021-04-26 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0012_merge_20210422_1003'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventory',
            name='discounts',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
