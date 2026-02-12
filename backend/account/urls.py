from django.urls import path
from . import views


urlpatterns = [
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('logout/', views.LogoutAPIView.as_view(), name='logout'),
    path('verify-email/', views.VerifyEmailAPIView.as_view(), name='verify_email'),
    path('resend-code/', views.ResendVerificationEmailView.as_view(), name='resend_code'),
    path('refresh-token/', views.CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.UserProfileAPIView.as_view(), name='profile'),
    path('change-credentials/', views.UserCredentialsUpdateAPIView.as_view(), name='credentials'),
    path('change-password/', views.PasswordChangeAPIView.as_view(), name='change_password'),
    path('change-phone_number/', views.PhoneNumberUpdateAPIView.as_view(), name='change_phone_number'),
    path('me/', views.UserMeAPIView.as_view(), name='user-me'),
]
