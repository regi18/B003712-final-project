# Generated by Django 4.2.2 on 2023-07-26 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='order',
            field=models.IntegerField(default=1),
        ),
    ]
