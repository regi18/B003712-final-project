from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from articles.models import Article, PdfIssue
from articles.serializers import ArticleSerializer, PdfIssueSerializer


class ArticleView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        if self.request.query_params.get('limit'):
            limit = int(self.request.query_params.get('limit'))
            queryset = queryset[:limit]

        return queryset

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

@api_view(['GET'])
def indexArticles(request):
    articles = Article.objects.all()

    # If a limit query parameter is passed, limit the queryset
    if (request.query_params.get('limit')):
        articles = articles[:int(request.query_params.get('limit'))]

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def showArticle(request, slug):
    articles = Article.objects.get(slug=slug)
    serializer = ArticleSerializer(articles)
    return Response(serializer.data)


@api_view(['POST'])
def createArticle(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def updateArticle(request, slug):
    article = Article.objects.get(slug=slug)
    serializer = ArticleSerializer(instance=article, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# ----------------------------------- #

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

# ----------------------------------- #
