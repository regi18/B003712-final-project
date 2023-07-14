# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from the_research_journal.models import ResearchJournalArticle
# from the_research_journal.serializers import ResearchJournalArticleSerializer


# @api_view(['GET'])
# def index(request):
#     items = ResearchJournalArticle.objects.all()

#     # If a limit query parameter is passed, limit the queryset
#     if (request.query_params.get('limit')):
#         items = items[:int(request.query_params.get('limit'))]

#     serializer = ResearchJournalArticleSerializer(items , many=True)

#     # Return just a snippet of the article's content
#     for item in serializer.data:
#         MAX_WORDS = 50
#         item['content'] = ' '.join(item['content'].split()[:MAX_WORDS]) + '...'

#     return Response(serializer.data)


# @api_view(['GET'])
# def show(request, id):
#     item = ResearchJournalArticle.objects.get(id=id)
#     serializer = ResearchJournalArticleSerializer(item)
#     return Response(serializer.data)