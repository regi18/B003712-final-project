from rest_framework import serializers
from main.models.cartoon import Cartoon


class CartoonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartoon
        fields = '__all__'