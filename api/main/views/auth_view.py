from rest_framework import views, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from main.models.user import User
from main.serializers.user import UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny


class LoginView(views.APIView):
    permission_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    def get(self, request):
        # Get the token from the request headers
        token_key = request.headers.get('Authorization').split()[1]

        # Delete the token from the database
        try:
            token = Token.objects.get(key=token_key)
            token.delete()
        except Token.DoesNotExist:
            pass

        return Response({'message': 'Logout successful.'}, status=status.HTTP_200_OK)