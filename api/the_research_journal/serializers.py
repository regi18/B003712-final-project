from rest_framework import serializers
from cartoons.models import Cartoon
from the_research_journal.models import ResearchJournalArticle


class ResearchJournalArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchJournalArticle
        fields = '__all__'