from rest_framework.response import Response
from rest_framework.decorators import api_view
from articles.models import Article, PdfIssue
from articles.serializers import ArticleSerializer, PdfIssueSerializer


@api_view(['GET'])
def index(request):
    articles = Article.objects.all()

    # If a limit query parameter is passed, limit the queryset
    if (request.query_params.get('limit')):
        articles = articles[:int(request.query_params.get('limit'))]

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def show(request, slug):
    articles = Article.objects.get(slug=slug)
    serializer = ArticleSerializer(articles)
    return Response(serializer.data)


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
