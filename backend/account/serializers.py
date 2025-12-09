from rest_framework import serializers
from .models import CustomUser



class CustomUserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'image', 'email', 'username', 'full_name', 'password']
        read_only_fields = ['id', 'password']

    def get_image(self, obj):
        obj.image.url = self.context['request'].build_absolute_uri(obj.image.url)
        return obj.image


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'full_name', 'password', 'password2']
        extra_kwargs = {"password": {'write_only': True}}

        def validate(self, data):
            if data['password'] != data['password2']:
                raise serializers.ValidationError({'password': "passwords aren't matched"})
            return data

        def create(self, validated_data):
            validated_data.pop('password2')
            user = CustomUser.objects.create_user(**validated_data)
            return user