from django.urls import path
from . import views
urlpatterns = [
    path('testapi/', views.ExampleAPIView.as_view()),
]