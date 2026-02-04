from drf_spectacular.extensions import OpenApiAuthenticationExtension
from .authenticate import CustomJWTCookieAuthentication


class CustomJWTScheme(OpenApiAuthenticationExtension):
    target_class = CustomJWTCookieAuthentication
    name = 'CustomJWTCookieAuthentication'

    def get_security_definition(self, auto_schema):
        return {
            'type': 'apiKey',
            'in': 'cookie',
            'name': 'access_token',
        }


