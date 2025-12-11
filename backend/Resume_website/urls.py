from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from . import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('web/account/', include('account.urls')),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)