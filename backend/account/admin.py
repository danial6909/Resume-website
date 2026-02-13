from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Register your models here.

class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'is_staff', 'is_active',]
    fieldsets = UserAdmin.fieldsets +(
    (None, {'fields': ('is_active',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets +(
        (None, {'fields': ('email', 'is_staff',)}),
    )


admin.site.register(CustomUser, CustomUserAdmin)