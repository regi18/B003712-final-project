from rest_framework.response import Response
from rest_framework.decorators import api_view
from main.models.pdf_issue import PdfIssue
from main.serializers.pdf_issue import PdfIssueSerializer


@api_view(['GET'])
def getPdfIssues(response):
    items = PdfIssue.objects.all()
    return Response(PdfIssueSerializer(items, many=True).data)


@api_view(['GET'])
def getLatestPdfIssue(response):
    try:
        items = PdfIssue.objects.latest('createdAt')
    except:
        items = []
    return Response(PdfIssueSerializer(items).data)