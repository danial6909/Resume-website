from drf_spectacular.types import OpenApiTypes
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveUpdateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegisterSerializer, ProfileSerializer, UserCredentialsUpdateSerializer, \
    PasswordChangeSerializer, PhoneNumberUpdateSerializer, LoginSerializer, UserInfoSerializer
from .models import Profile
from django.contrib.auth import authenticate
from .utils import get_tokens_for_user, set_auth_cookies, delete_auth_cookies
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.serializers import TokenRefreshSerializer



class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=UserRegisterSerializer,
        responses={201: UserInfoSerializer}
    )
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)

        response = Response({
            "message": "ثبت نام با موفقیت انجام شد",
            "user": UserInfoSerializer(user).data,
        }, status=status.HTTP_201_CREATED)

        return set_auth_cookies(response, tokens)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle] # we use this class for special throttling
    throttle_scope = 'auth_limit' # the throttle we want to be set we mention it

    @extend_schema(
        request=LoginSerializer,
        responses={200: UserInfoSerializer},
        description='Login and get user data with cookies'
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        tokens = get_tokens_for_user(user)

        response = Response({
            "message": "ورود با موفقیت انجام شد",
            "user": UserInfoSerializer(user).data,
        }, status=status.HTTP_200_OK)

        return set_auth_cookies(response, tokens)


class CookieTokenRefreshView(APIView):
    permission_classes = [AllowAny]
    serializer_class = TokenRefreshSerializer

    @extend_schema(
        tags=['Auth'],
        responses={200: TokenRefreshSerializer},
        auth=[]
    )
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            raise ValidationError({"refresh_token": ["توکن refresh گم شده است!"]})

        try:
            refresh = RefreshToken(refresh_token)
            tokens = {
                'access': str(refresh.access_token),
                'refresh': refresh_token
            }
            response = Response({
                "status": "success",
                "message": "توکن با موفقیت تازه سازی شد."
            }, status=status.HTTP_200_OK)

            return set_auth_cookies(response, tokens)

        except Exception:
            raise ValidationError({"refresh_token": ["Invalid or expired refresh token"]})


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=None,
        responses={200: OpenApiTypes.OBJECT},
        description='logout details, and remove necessary cookies')
    def post(self, request):
        response = Response({"message": "با موفقیت از حساب خود خارج شدید"}, status=status.HTTP_200_OK)

        return delete_auth_cookies(response)

class UserProfileAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        try:
            return self.request.user.profile
        except Profile.DoesNotExist:
            return Profile.objects.create(user=self.request.user)


class UserCredentialsUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserCredentialsUpdateSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self):
        return {'request': self.request}


class PasswordChangeAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordChangeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {'message': 'پسورد با موفقیت تغییر پیدا کرد!'},
            status=status.HTTP_200_OK
        )


class PhoneNumberUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhoneNumberUpdateSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self):
        return {'request': self.request}

