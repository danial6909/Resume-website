from rest_framework import serializers
from .models import CustomUser



class CustomUserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(allow_null=True, required = True)
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'image', 'image_url', 'email', 'username', 'full_name']
        read_only_fields = ['id', 'username']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

    def update(self, instance, validated_data):
        validated_data.pop('username', None)

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