from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile
from django.templatetags.static import static



CustomUser = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'image', 'image_url', 'full_name', 'bio']
        read_only_fields = ['id']

    def get_image_url(self, obj):
        if obj.image:
            if 'request' in self.context:
                return self.context['request'].build_absolute_uri(obj.image.url)
            return obj.image.url

        default_static_path = 'images/profile_pics/profile_image_default.png'

        if 'request' in self.context:
            return self.context['request'].build_absolute_uri(static(default_static_path))
        return static(default_static_path)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {"password": {'write_only': True}}

    def validate(self, data):
            if data['password'] != data['password2']:
                raise serializers.ValidationError({'password': "passwords aren't matched"})
            return data

    def create(self, validated_data):
            password2 = validated_data.pop('password2')
            user = CustomUser.objects.create_user(**validated_data)
            return user