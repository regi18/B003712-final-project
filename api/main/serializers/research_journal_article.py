from rest_framework import serializers
from main.models.research_journal_article import ResearchJournalArticle


class ResearchJournalArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchJournalArticle
        fields = '__all__'