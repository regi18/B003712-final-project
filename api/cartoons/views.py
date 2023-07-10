from rest_framework.response import Response
from rest_framework.decorators import api_view
from cartoons.models import Cartoon
from cartoons.serializers import CartoonSerializer


@api_view(['GET'])
def index(response):
    items = Cartoon.objects.all()
    return Response(CartoonSerializer(items, many=True).data)
