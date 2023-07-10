from rest_framework import serializers
from articles.models import Article, PdfIssue


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class PdfIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = PdfIssue
        fields = '__all__'
