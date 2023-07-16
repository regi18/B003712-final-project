from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from main.models.pdf_issue import PdfIssue
from main.serializers.pdf_issue import PdfIssueSerializer


class DownloadsView(generics.ListCreateAPIView):
    queryset = PdfIssue.objects.all()
    serializer_class = PdfIssueSerializer


class DownloadDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PdfIssue.objects.all()
    serializer_class = PdfIssueSerializer


@api_view(['GET'])
def getLatestPdfIssue(response):
    try:
        items = PdfIssue.objects.latest('createdAt')
    except:
        items = []

    d = PdfIssueSerializer(items).data
    d['pdf'] = response.build_absolute_uri(d['pdf'])
    return Response(d)