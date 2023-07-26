from rest_framework import generics
from main.models.section import Section
from main.serializers.section import SectionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction


class SectionsView(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer


class SectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer


@api_view(['PUT'])
def updateOrder(request):
    d = [Section(slug=values.get('slug'), order=values.get('order')) for values in request.data]

    with transaction.atomic():
        res = Section.objects.bulk_update(d, ['order'], batch_size=1000)

    if (res):
        return Response(status=200, data={'message': 'Updated'})
    else:
        return Response(status=400)