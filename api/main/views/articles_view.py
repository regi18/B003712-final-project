from rest_framework import generics
from main.models.article import Article
from main.serializers.article import ArticleSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


class ArticlesView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # Filter by section
        if self.request.query_params.get('section'):
            queryset = queryset.filter(section=self.request.query_params.get('section'))

        # Filter by issueNumber
        if self.request.query_params.get('issueNumber'):
            queryset = queryset.filter(issueNumber=self.request.query_params.get('issueNumber'))
        
        # Limit the number of results
        if self.request.query_params.get('limit'):
            limit = int(self.request.query_params.get('limit'))
            queryset = queryset[:limit]

        return queryset


class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


@api_view(['GET'])
def getIssueNumbers(response):
    try:
        items = Article.objects.order_by('issueNumber').values_list('issueNumber', flat=True).distinct()
    except:
        items = []

    return Response(items)