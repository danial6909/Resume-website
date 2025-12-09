from django.http import HttpResponse
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from backend.account.serializers import UserRegisterSerializer
from .models import CustomUser




class RegisterAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer
    queryset = CustomUser.objects.all()


class ExampleAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        return HttpResponse(data.values())