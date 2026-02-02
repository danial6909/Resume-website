from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.conf import settings



def custom_exception_handler(exception, context):
    # this will rewrite the default exception handler belong to rest_framework
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

        # here we take errors from old handler list and change it to string to new handler
        # if there is just one error, then there is obviously no list, so we directly make it in else statement
        if isinstance(response.data, dict):
            for field, errors in response.data.items():
                    custom_data["errors"][field] = errors if isinstance(errors, list) else [errors]

        # nonfield errors should be handled too, so there it is:
        elif isinstance(response.data, list):
            custom_data["errors"]["non_field_errors"] = response.data

        if response.status_code == 429:
            custom_data = {
                "status": "error",
                "status_code": 429,
                "message": status_messages[429],
                "errors": {
                    "non_field_errors": [f"Retry after {response.wait} seconds."]
                }
            }
            response.data = custom_data
            return response

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