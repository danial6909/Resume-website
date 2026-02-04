from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.conf import settings
from django.utils.translation import gettext_lazy as _
import re


def custom_exception_handler(exception, context):
    response = exception_handler(exception, context)

    status_messages = {
        status.HTTP_400_BAD_REQUEST: "داده‌های ارسالی معتبر نیستند.",
        status.HTTP_401_UNAUTHORIZED: "برای دسترسی باید وارد حساب کاربری شوید.",
        status.HTTP_403_FORBIDDEN: "شما اجازه دسترسی به این بخش را ندارید.",
        status.HTTP_404_NOT_FOUND: "منبع مورد نظر یافت نشد.",
        status.HTTP_405_METHOD_NOT_ALLOWED: "این متد برای این آدرس مجاز نیست.",
        status.HTTP_500_INTERNAL_SERVER_ERROR: "خطایی در سمت سرور رخ داده است.",
        status.HTTP_429_TOO_MANY_REQUESTS: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفا کمی صبر کنید."
    }

    if response is not None:
        message = status_messages.get(response.status_code, "خطایی رخ داده است.")

        custom_data = {
            "status": "error",
            "status_code": response.status_code,
            "message": message,
            "errors": {}
        }

        if response.status_code == 429:
            wait_time = getattr(exception, 'wait', 'چند')
            custom_data["errors"]["non_field_errors"] = [f"لطفاً {wait_time} ثانیه دیگر دوباره تلاش کنید."]
            response.data = custom_data
            return response

        if isinstance(response.data, dict):
            for field, errors in response.data.items():
                custom_data["errors"][field] = errors if isinstance(errors, list) else [errors]
        elif isinstance(response.data, list):
            custom_data["errors"]["non_field_errors"] = response.data

        response.data = custom_data
        return response

    return Response({
        "status": "error",
        "status_code": 500,
        "message": "یک خطای پیش‌بینی نشده در سرور رخ داد.",
        "errors": {"server": ["Internal Server Error"]}
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


COOKIE_SETTINGS = {
    'httponly': True,
    'secure': not settings.DEBUG, # this should be False to be working in local
    'samesite': 'None' if not settings.DEBUG else 'Lax',
    'path': '/',
}

def set_auth_cookies(response, tokens):
    access_lifetime = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
    refresh_lifetime = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()

    response.set_cookie(
        key='access_token',
        value=tokens['access'],
        max_age=int(access_lifetime),
        **COOKIE_SETTINGS
    )
    response.set_cookie(
        key='refresh_token',
        value=tokens['refresh'],
        max_age=int(refresh_lifetime),
        **COOKIE_SETTINGS
    )
    return response


def delete_auth_cookies(response):
    """
    حذف توکن‌ها از کوکی برای عملیات Logout
    """
    response.delete_cookie('access_token', path='/')
    response.delete_cookie('refresh_token', path='/')
    return response


# Password settings
class SymbolValidator:
    def validate(self, password, user=None):
        if not re.search(r'[!@#$%^&*(),.?":{}|<>|_]', password):
            raise ValidationError(_("پسورد باید حداقل شامل یک کاراکتر خاص (مثل @، #، $ و...) باشد."),
                                  code='password_no_symbol')

    def get_help_text(self):
        return _("پسورد شما باید حداقل شامل یک سمبل باشد.")


class MaxLengthValidator:
    def __init__(self, max_length=128):
        self.max_length = max_length

    def validate(self, password, user=None):
        if len(password) > self.max_length:
            raise ValidationError(
                _("رمز عبور نمی‌تواند بیشتر از %(max_length)d کاراکتر باشد."),
                code='password_too_long',
                params={'max_length': self.max_length},
            )

    def get_help_text(self):
        return _("رمز عبور شما باید حداکثر %(max_length)d کاراکتر باشد.") % {'max_length': self.max_length}