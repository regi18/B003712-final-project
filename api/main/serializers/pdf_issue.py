from rest_framework import serializers
from main.models.pdf_issue import PdfIssue


class PdfIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = PdfIssue
        fields = '__all__'
