from django.core import signing
from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            rw_token = request.get_signed_cookie(
                'access_token',
                salt='auth_token_salt'
            )
        except (signing.BadSignature, KeyError):
            # if signature is different or cookie is not valid
            rw_token = None

        if rw_token is None:
            return None

        validated_token = self.get_validated_token(rw_token)
        return self.get_user(validated_token), validated_token