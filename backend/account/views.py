from .serializers import UserRegisterSerializer, ProfileSerializer, UserCredentialsUpdateSerializer, \
    PasswordChangeSerializer, PhoneNumberUpdateSerializer, LoginSerializer, UserInfoSerializer
from .utils import get_tokens_for_user, set_auth_cookies, delete_auth_cookies
from .models import Profile
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers as drf_serializers
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveUpdateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import authenticate, get_user_model


CustomUser = get_user_model()

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=UserRegisterSerializer,
        responses={201: inline_serializer(
            name='RegisterResponse',
            fields={
                'message': drf_serializers.CharField(),
                'user': UserInfoSerializer(),
            }
        )},
        description="این ای پی ای برای عملیات ثبت نام هست، که بلافاصله بعد از ثبت نام به طور خودکار کاربر لاگین میشه."
    )
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_with_profile = CustomUser.objects.select_related('profile').get(id=user.id)
        tokens = get_tokens_for_user(user)

        response = Response({
            "message": "ثبت نام با موفقیت انجام شد",
            "user": UserInfoSerializer(user_with_profile, context={'request':request}).data,
        }, status=status.HTTP_201_CREATED)

        return set_auth_cookies(response, tokens)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle] # we use this class for special throttling
    throttle_scope = 'auth_limit' # the throttle we want to be set we mention it

    @extend_schema(
        request=LoginSerializer,
        responses={200: inline_serializer(
            name='LoginResponse',
            fields={
                'message': drf_serializers.CharField(),
                'user': UserInfoSerializer(),
            }
        )},
        description='این ای پی ای برای لاگین کردن هست.'
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        user_with_profile = CustomUser.objects.select_related('profile').get(id=user.id)
        tokens = get_tokens_for_user(user)

        response = Response({
            "message": "ورود با موفقیت انجام شد",
            "user": UserInfoSerializer(user_with_profile, context={'request':request}).data,
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


        except (InvalidToken, TokenError) as e:

            raise ValidationError({"refresh_token": ["توکن نامعتبر یا منقضی شده است."]})


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

    def get_object(self):
        user = self.request.user
        try:
            return Profile.objects.select_related('user').get(user=user)
        except Profile.DoesNotExist:
            return Profile.objects.create(user=user)


class UserMeAPIView(APIView):
     permission_classes = [IsAuthenticated]

     @extend_schema(responses={200: UserInfoSerializer})
     def get(self, request):
         # request.user already loaded by middleware
         user = request.user
         # Only fetch profile if not already loaded
         if not hasattr(user, 'profile'):
             user = CustomUser.objects.select_related('profile').get(id=user.id)

         serializer = UserInfoSerializer(user, context={'request': request})
         return Response({
            "user": UserInfoSerializer(user, context={'request':request}).data,
        }, status=status.HTTP_200_OK)


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

