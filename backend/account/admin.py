from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, HeroSlider
from django import forms
from django.contrib.auth.forms import UserCreationForm



# Create a Form to add user in Admin Panel
class CustomUserCreationForm(UserCreationForm):
    phone_number = forms.CharField(
        label='Phone Number',
        required=False,
        widget=forms.TextInput(attrs={'placeholder': '0912...'})
    )

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number']


# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm

    list_display = ['username', 'email', 'phone_number', 'is_staff', 'is_active']
    search_fields = ['username', 'email', 'phone_number']
    list_filter = ['is_staff', 'is_active', 'is_superuser']

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('email', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'phone_number', 'password1', 'password2'),
        }),
    )


@admin.register(HeroSlider)
class HeroSliderAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['title', 'description']