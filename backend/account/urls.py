from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import RegisterAPIView

urlpatterns = [
    path('testapi/', views.ExampleAPIView.as_view()),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterAPIView.as_view(), name='register'),
]