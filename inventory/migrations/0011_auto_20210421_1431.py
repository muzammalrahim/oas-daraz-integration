# Generated by Django 3.1.5 on 2021-04-21 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0010_auto_20210419_1616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productrating',
            name='rating',
            field=models.DecimalField(decimal_places=2, max_digits=3),
        ),
    ]
