from .serializers import UserRegisterSerializer, ProfileSerializer, UserCredentialsUpdateSerializer, \
    PasswordChangeSerializer, PhoneNumberUpdateSerializer, LoginSerializer, UserInfoSerializer, \
    EmailVerificationSerializer
from .utils import get_tokens_for_user, set_auth_cookies, delete_auth_cookies, send_verification_email
from .models import Profile, EmailVerification
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
from django.conf import settings
from django.utils import timezone


CustomUser = get_user_model()

class ResendVerificationEmailView(APIView):
    permission_classes = (AllowAny,)
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = 'auth_limit'
    serializer_class = None

    def post(self, request, *args, **kwargs):
        email = request.COOKIES.get('user_email_pending')

        if not email:
            return Response(
                {"error": "اطلاعات نشست شما منقضی شده است. لطفا دوباره ثبت‌نام کنید."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        verification = EmailVerification.objects.filter(email=email).first()

        if not verification:
            return Response(
                {"error": "درخواستی برای این ایمیل یافت نشد."},
                status=status.HTTP_404_NOT_FOUND
            )

        time_elapsed = timezone.now() - verification.created_at
        if time_elapsed < timezone.timedelta(minutes=2):
            left_time = 120 - int(time_elapsed.total_seconds())
            return Response(
                {"error": f"لطفاً {left_time} ثانیه دیگر صبر کنید."},
                status=status.HTTP_400_BAD_REQUEST
            )

        send_verification_email(verification.username, email, verification.password)

        return Response({"message": "کد تایید جدید ارسال شد."}, status=status.HTTP_200_OK)


class VerifyEmailAPIView(APIView):
    permission_classes = (AllowAny,)
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'auth_limit'

    @extend_schema(
        request=EmailVerificationSerializer,
        responses={200: inline_serializer(
            name='VerifyEmailResponse',
            fields={
                'message': drf_serializers.CharField(),
                'user': UserInfoSerializer(),
            }
        )},
        description='تایید کد ۶ رقمی. اگر کاربر جدید باشد ساخته می‌شود و اگر قدیمی باشد لاگین می‌شود.'
    )
    def post(self, request):
        serializer = EmailVerificationSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)

        # Check if username already is in database or not
        verification_obj = serializer.validated_data['verification_obj']
        is_registration = verification_obj.username is not None

        user = serializer.save()
        user = CustomUser.objects.select_related('profile').get(id=user.id)

        tokens = get_tokens_for_user(user)

        success_message = 'حساب کاربری شما با موفقیت فعال شد.' if is_registration else 'با موفقیت وارد شدید.'

        response = Response({
            "message": success_message,
            "user": UserInfoSerializer(user, context={'request': request}).data,
        }, status=status.HTTP_200_OK if not is_registration else status.HTTP_201_CREATED)

        response.delete_cookie('user_email_pending')

        return set_auth_cookies(response, tokens)

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=UserRegisterSerializer,
        responses={200: inline_serializer(
            name='RegisterResponse',
            fields={
                'message': drf_serializers.CharField(),
                'email': drf_serializers.EmailField(),
            }
        )},
        description="این ای پی ای برای ارسال فرم ثبت نام است. پس از ارسال فرم، کد تایید به ایمیل کاربر ارسال می‌شود."
    )
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()

        # Send verification email:
        send_verification_email(
            username=data['username'],
            email=data['email'],
            hashed_password=data['password']
        )

        response = Response({
            'message': f"کاربر {data['username']} عزیز، کد تایید برای شما ارسال شد.",
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            'user_email_pending',
            data['email'],
            max_age = 600,
            httponly = True,
            samesite = 'None' if not settings.DEBUG else 'Lax',
            secure = not settings.DEBUG,
        )

        return response


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle] # we use this class for special throttling
    throttle_scope = 'auth_limit' # the throttle we want to be set we mention it

    @extend_schema(
        request=LoginSerializer,
        responses={200: inline_serializer(
            name='LoginStep1Response',
            fields={'message': drf_serializers.CharField(), '2fa_required': drf_serializers.BooleanField()}
        )},
        description='مرحله اول لاگین: تایید مشخصات و ارسال کد 2FA'
    )
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        send_verification_email(email=user.email)

        response = Response({
            "message": "کد تایید دو مرحله‌ای به ایمیل شما ارسال شد.",
            "2fa_required": True
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            'user_email_pending',
            user.email,
            max_age=600,
            httponly=True,
            samesite='None' if not settings.DEBUG else 'Lax',
            secure=not settings.DEBUG,
        )
        return response

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
        responses={200: inline_serializer(
            name='LogoutResponse',
            fields={'message': drf_serializers.CharField()}
        )},
        description='خروج از حساب کاربری و پاکسازی کوکی‌های احراز هویت (Access & Refresh).'
    )
    def post(self, request):
        response = Response(
            {"message": "با موفقیت از حساب خود خارج شدید"},
            status=status.HTTP_200_OK
        )
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

