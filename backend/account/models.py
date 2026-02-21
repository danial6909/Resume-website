from django.conf import settings
from django.utils import timezone
from .managers import CustomUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=40)
    email = models.EmailField(unique=True, max_length=60)
    phone_number = models.CharField(unique=True, blank=True, null=True, max_length=13)
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


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    full_name = models.CharField( max_length=150, blank=True, null=True)
    bio = models.TextField(max_length=1000, blank=True)
    # date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.user.username


class EmailVerification(models.Model):
    username = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField()
    password = models.CharField(max_length=128, null=True, blank=True)
    code = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        from django.utils import timezone
        return timezone.now() > self.created_at + timezone.timedelta(minutes=2)


class ServerErrorLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    exception_type = models.CharField(max_length=255)
    message = models.TextField()
    file_name = models.CharField(max_length=500, null=True)
    line_number = models.IntegerField(null=True)
    url_path = models.CharField(max_length=255, null=True)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = "Log خطای سرور"
        verbose_name_plural = "Logهای خطای سرور"

    def __str__(self):
        return f"{self.exception_type} - {self.timestamp}"


class HeroSlider(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='hero_sliders/')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title