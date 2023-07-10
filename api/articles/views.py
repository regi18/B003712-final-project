from rest_framework.response import Response
from rest_framework.decorators import api_view
from articles.models import Article
from articles.serializers import ArticleSerializer


@api_view(['GET'])
def index(request):
    articles = Article.objects.all().order_by('-date')

    # If a limit query parameter is passed, limit the queryset
    if (request.query_params.get('limit')):
        articles = articles[:int(request.query_params.get('limit'))]

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

