# Generated by Django 4.2.10 on 2024-04-01 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeds', '0002_alter_post_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='text',
            field=models.BinaryField(),
        ),
    ]