from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer, ProfileSerializer
from .models import CustomUser, Profile




class RegisterAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer
    queryset = CustomUser.objects.all()


class UserProfileAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        try:
            return self.request.user.profile
        except Profile.DoesNotExist:
            return Profile.objects.create(user=self.request.user)


class ExampleAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        return HttpResponse(data.values())