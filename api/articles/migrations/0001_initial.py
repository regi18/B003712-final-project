# Generated by Django 4.2.2 on 2023-07-10 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('slug', models.SlugField(max_length=100, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=100)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='date published')),
                ('imgSrc', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('issueNumber', models.IntegerField()),
            ],
        ),
    ]
