from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import exception_handler
from rest_framework.response import Response
import re
import random
import traceback
import sys


def generate_unique_verification_code():
    from .models import EmailVerification
    import string
    # we make a function to check the generated code doesn't exist in database.
    while True:
        code = ''.join(random.choices(string.digits, k=6))

        if not EmailVerification.objects.filter(code=code).exists():
            return code


def send_verification_email(username, email, hashed_password):
    from .models import EmailVerification
    # Generate Code
    code = generate_unique_verification_code()

    ten_minutes_ago = timezone.now() - timezone.timedelta(minutes=10)
    EmailVerification.objects.filter(created_at__lt=ten_minutes_ago).delete()

    # Temporary create New instance of EmailVerification model.
    EmailVerification.objects.update_or_create(
        email=email,
        defaults={
            'username': username,
            'password': hashed_password,
            'code': code,
            'created_at': timezone.now()
        }
    )

    subjects = 'کد تایید ثبت‌نام'
    message = f'کد تایید شما: {code}\nاین کد تا ۲ دقیقه دیگر منقضی می‌شود.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(subjects, message, email_from, recipient_list)

    return code


# ======== Error message translation map ========
ERROR_TRANSLATIONS = {
    # Common DRF errors
    'This field is required.': 'این فیلد الزامی است.',
    'This field may not be blank.': 'این فیلد نمی‌تواند خالی باشد.',
    'This field may not be null.': 'این فیلد نمی‌تواند خالی باشد.',
    'Enter a valid email address.': 'یک ایمیل معتبر وارد کنید.',
    'Ensure this field has no more than {max_length} characters.': 'این فیلد نباید بیشتر از {max_length} کاراکتر باشد.',
    'Ensure this field has at least {min_length} characters.': 'این فیلد باید حداقل {min_length} کاراکتر باشد.',
    'Custom User with this email already exists.': 'این ایمیل قبلاً ثبت شده است.',
    'Custom User with this username already exists.': 'این نام کاربری قبلاً انتخاب شده است.',

    # Authentication errors
    'No active account found with the given credentials': 'حساب کاربری فعالی با این مشخصات یافت نشد.',
    'Invalid token.': 'توکن نامعتبر است.',
    'Token is invalid or expired': 'توکن نامعتبر یا منقضی شده است.',

    # Password validation errors
    'This password is too short. It must contain at least 8 characters.': 'رمز عبور باید حداقل ۸ کاراکتر باشد.',
    'This password is too common.': 'این رمز عبور بسیار رایج است.',
    'This password is entirely numeric.': 'رمز عبور نمی‌تواند فقط عدد باشد.',
    'The password is too similar to the username.': 'رمز عبور نباید شبیه نام کاربری باشد.',
    'The password is too similar to the email.': 'رمز عبور نباید شبیه ایمیل باشد.',
}


def translate_error_message(message):
    """
    Translate English DRF/Django error messages to Persian
    """
    if isinstance(message, str):
        # Check exact match
        if message in ERROR_TRANSLATIONS:
            return ERROR_TRANSLATIONS[message]

        # ======== بهبود برای dynamic messages ========
        # Check for "Ensure this field has at least X characters"
        if message.startswith("Ensure this field has at least"):
            match = re.search(r'at least (\d+) character', message)
            if match:
                num = match.group(1)
                return f"این فیلد باید حداقل {num} کاراکتر باشد."

        # Check for "Ensure this field has no more than X characters"
        if message.startswith("Ensure this field has no more than"):
            match = re.search(r'no more than (\d+) character', message)
            if match:
                num = match.group(1)
                return f"این فیلد نباید بیشتر از {num} کاراکتر باشد."
        # ======== ========

        return message  # Return original if no translation found

    return message

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
                if isinstance(errors, list):
                    custom_data["errors"][field] = [translate_error_message(err) for err in errors]
                else:
                    custom_data["errors"][field] = [translate_error_message(errors)]
        elif isinstance(response.data, list):
            custom_data["errors"]["non_field_errors"] = [translate_error_message(err) for err in response.data]

        response.data = custom_data
        return response
    else:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        error_type = "Server Error"
        error_message = "یک خطای غیرمنتظره رخ داد."
        technical_details = "Contact Admin"

        if settings.DEBUG:
            error_type = exc_type.__name__ if exc_type else "Exception"
            error_message = str(exception)

            if exc_traceback:
                last_traceback = traceback.extract_tb(exc_traceback)[-1]
                technical_details = f"File: {last_traceback.filename} | Line: {last_traceback.lineno}"

            else:
                technical_details = "Traceback not available"

        return Response({
            "status": "error",
            "status_code": 500,
            "message": "خطای سیستمی رخ داده است.",
            "technical_details": technical_details,
            "errors": {
                "exception_type": [error_type],  # نوع خطا (مثل ZeroDivisionError)
                "server": [error_message], # پیام واقعی خطا (مثل division by zero)
            }
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