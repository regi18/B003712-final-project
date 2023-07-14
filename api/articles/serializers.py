from rest_framework import serializers
from articles.models import Article, PdfIssue, Section


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class PdfIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = PdfIssue
        fields = '__all__'


class SectionSerializer(serializers.Serializer):
    class Meta:
        model = Section
        fields = '__all__'