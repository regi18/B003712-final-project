# Generated by Django 4.2.2 on 2023-07-14 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_rename_imgsrc_article_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='images/articles'),
        ),
        migrations.AlterField(
            model_name='cartoon',
            name='img',
            field=models.ImageField(upload_to='images/cartoons'),
        ),
    ]
