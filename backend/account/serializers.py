from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Profile
from django.templatetags.static import static
from django.core.exceptions import ValidationError as DjangoValidationError



CustomUser = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'image', 'image_url', 'full_name', 'bio']
        read_only_fields = ['id']

    def get_image_url(self, obj)-> str:
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


class UserCredentialsUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, max_length=150)
    username = serializers.CharField(required=False, max_length=150)
    current_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({'current_password': "Your current password is incorrect."})
        return value

    def validate(self, data):
        user = self.context['request'].user
        new_username = data.get('username')

        if new_username and new_username != user.username:
            if CustomUser.objects.filter(username=new_username).exists():
                raise serializers.ValidationError({'username' : 'This Username already exists'})

        new_email = data.get('email')
        if new_email and new_email != user.email:
            if CustomUser.objects.filter(email=new_email).exists():
                raise serializers.ValidationError({'email' : 'This Email already exists'})

        if not new_username and not new_email:
            raise serializers.ValidationError('At least one of the username or email fields must be submitted for update.')

        return data

    def update(self, instance, validated_data):
        if validated_data['email']:
            instance.email = validated_data['email']

        if validated_data['username']:
            instance.username = validated_data['username']

        instance.save()
        return instance


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    new_password_confirm = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError({'old_password': "Your current password is incorrect."})
        return value

    def validate(self, data):
        new_password = data.get('password1')
        new_password_confirm = data.get('password2')

        if new_password != new_password_confirm:
            raise serializers.ValidationError({'new_password_confirm': "Passwords don't match"})

        try:
            validate_password(new_password, self.context['request'].user)
        except DjangoValidationError as e:
            raise serializers.ValidationError({'new_password': list(e.messages)})

        return data

    def save(self, request):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class PhoneNumberUpdateSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True, max_length=13)
    current_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError("Your current password is incorrect.")
        return value

    def validate_phone_number(self, value):
        user = self.context['request'].user

        if value != user.phone_number:
            if CustomUser.objects.filter(phone_number=value).exists():
                raise serializers.ValidationError('This phone number already exists.')
        return value

    def update(self, instance, validated_data):
        instance.phone_number = validated_data['phone_number']
        instance.save()
        return instance