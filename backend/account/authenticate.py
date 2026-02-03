from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        rw_token = request.COOKIES.get('access_token') or None

        if rw_token is None:
            return None

        validated_token = self.get_validated_token(rw_token)
        return self.get_user(validated_token), validated_token