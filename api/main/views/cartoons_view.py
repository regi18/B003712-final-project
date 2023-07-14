from rest_framework import generics
from main.models.cartoon import Cartoon
from main.serializers.cartoon import CartoonSerializer


class CartoonsView(generics.ListCreateAPIView):
    queryset = Cartoon.objects.all()
    serializer_class = CartoonSerializer


class CartoonDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cartoon.objects.all()
    serializer_class = CartoonSerializer