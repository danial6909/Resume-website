from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Profile



User = settings.AUTH_USER_MODEL

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """ this function creates a new profile
    after each time CustomUser make an instance"""

    if created:
        Profile.objects.get_or_create(user=instance)