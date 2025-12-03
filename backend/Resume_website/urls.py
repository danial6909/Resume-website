from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from . import settings
# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('testi/', include('account.urls')),
    # path('')
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)