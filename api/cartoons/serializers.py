from rest_framework import serializers
from cartoons.models import Cartoon


class CartoonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartoon
        fields = '__all__'