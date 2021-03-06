# Generated by Django 3.1.5 on 2021-04-09 12:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_auto_20210408_1123'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventory',
            name='product_image',
        ),
        migrations.CreateModel(
            name='ProductImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_image', models.ImageField(blank=True, max_length=191, null=True, upload_to='')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='inventory.inventory')),
            ],
        ),
    ]
