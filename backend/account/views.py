from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer, CustomUserSerializer
from .models import CustomUser




class RegisterAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer
    queryset = CustomUser.objects.all()


class UserProfileAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def get_object(self):
        return self.request.user

class ExampleAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        return HttpResponse(data.values())