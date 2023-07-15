from rest_framework import serializers
from main.models.article import Article
from drf_extra_fields.fields import Base64ImageField

class ArticleSerializer(serializers.ModelSerializer):
    img = Base64ImageField(use_url=True, required=False)

    class Meta:
        model = Article
        fields = '__all__'
