from rest_framework import serializers
from main.models.cartoon import Cartoon
from drf_extra_fields.fields import Base64ImageField


class CartoonSerializer(serializers.ModelSerializer):
    img = Base64ImageField(use_url=True, required=False)

    class Meta:
        model = Cartoon
        fields = '__all__'