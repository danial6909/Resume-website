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
import secrets
import traceback
import sys
import logging


logger = logging.getLogger('account')

def generate_unique_verification_code():
    from .models import EmailVerification
    import string

    alphabet = string.digits

    # we make random code and a function to check the generated code doesn't exist in database.
    while True:
        code = ''.join(secrets.choice(alphabet) for i in range(6))

        if not EmailVerification.objects.filter(code=code).exists():
            return code


def send_verification_email(username=None, email=None, hashed_password=None):
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

    try:
        # We check subject here either it is for login or register
        subject = "کد تایید ورود" if username is None else "کد تایید ثبت‌نام"

        send_mail(
            subject=subject,
            message=f"کد تایید شما: {code}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
    except Exception as e:
        user_friendly_error = "ارسال ایمیل با خطا مواجه شد. ممکن است آدرس ایمیل وجود نداشته باشد یا سرور موقتاً در دسترس نباشد."

        raise ValidationError({
            "email": [user_friendly_error]
        })

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

# account/utils.py

def custom_exception_handler(exception, context):

    # These are base information that we collect from an error.
    exc_type, exc_value, exc_traceback = sys.exc_info()
    error_type = exc_type.__name__ if exc_type else "Exception"
    error_message = str(exception)
    f_name, l_num = "Unknown", 0
    path = context.get('request').path if 'request' in context else "Unknown"

    if exc_traceback:
        extract = traceback.extract_tb(exc_traceback)
        if extract:
            last_traceback = extract[-1]
            f_name = last_traceback.filename
            l_num = last_traceback.lineno

    try:
        from .models import ServerErrorLog
        ServerErrorLog.objects.create(
            exception_type=error_type,
            message=error_message,
            file_name=f_name,
            line_number=l_num,
            url_path=path
        )
    except Exception:
        pass

    response = exception_handler(exception, context)

    status_messages = {
        status.HTTP_400_BAD_REQUEST: "داده‌های ارسالی معتبر نیستند.",
        status.HTTP_401_UNAUTHORIZED: "برای دسترسی باید وارد حساب کاربری شوید.",
        status.HTTP_403_FORBIDDEN: "شما اجازه دسترسی به این بخش را ندارید.",
        status.HTTP_404_NOT_FOUND: "منبع مورد نظر یافت نشد.",
        status.HTTP_405_METHOD_NOT_ALLOWED: "این متد برای این آدرس مجاز نیست.",
        status.HTTP_429_TOO_MANY_REQUESTS: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفا کمی صبر کنید.",
        status.HTTP_500_INTERNAL_SERVER_ERROR: "خطایی در سمت سرور رخ داده است.",
    }

    if response is not None:

        message = status_messages.get(response.status_code, "خطایی در درخواست رخ داده است.")

        custom_data = {
            "status": "error",
            "status_code": response.status_code,
            "message": message,
            "technical_details": f"File: {f_name} | Line: {l_num}" if settings.DEBUG else "عملیات با خطا مواجه شد.",
            "errors": {}
        }

        # Every DRF Error Include 400 Errors Store In Log
        if response.status_code == 429:
            wait_time = getattr(exception, 'wait', 'چند')
            custom_data["errors"]["non_field_errors"] = [f"لطفاً {wait_time} ثانیه دیگر دوباره تلاش کنید."]

            # ثبت لاگ تمیز در فایل
            logger.error(f"DRF_429 | {error_type}: {error_message} | Path: {path}")

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

        logger.error(f"DRF_{response.status_code} | {error_type}: {error_message} | File: {f_name} | Line: {l_num}")

        response.data = custom_data
        return response

    else:

        # Every Internal Errors And Server Error Like 500 Errors Store In Log
        logger.error(f"SERVER_500 | {error_type}: {error_message} | File: {f_name} | Line: {l_num}")

        return Response({
            "status": "error",
            "status_code": 500,
            "message": "خطای سیستمی رخ داده است.",
            "technical_details": f"File: {f_name} | Line: {l_num}" if settings.DEBUG else "با پشتیبانی تماس بگیرید.",
            "errors": {
                "exception_type": [error_type],
                "server": [error_message],
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
    cookie_keys = ['access_token', 'refresh_token', 'sessionid', 'csrftoken']

    for key in cookie_keys:
        response.delete_cookie(
            key,
            path='/',
            domain=getattr(settings, 'SESSION_COOKIE_DOMAIN', None),
            samesite=getattr(settings, 'SESSION_COOKIE_SAMESITE')
        )

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