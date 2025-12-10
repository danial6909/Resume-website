from django.utils import timezone
from .managers import CustomUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=40)
    email = models.EmailField(unique=True, blank=True, max_length=60)
    full_name = models.CharField(blank=True, max_length=150)
    is_staff = models.BooleanField(default=False,
                                   help_text="Designates whether the user can log into this admin site.")
    is_active = models.BooleanField(default=True,
                                    help_text="Designates whether this user should be treated as active.")
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = 'Custom User'
        verbose_name_plural = 'Custom Users'

    def __str__(self):
        return self.username