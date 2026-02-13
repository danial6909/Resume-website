from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import CustomUser

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(ModelAdmin):
    list_display = ['username', 'email', 'is_staff', 'is_active',]
    search_fields = ['username', 'email', 'phone_number']
    list_filter = ['is_staff', 'is_active']