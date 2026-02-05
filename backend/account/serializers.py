from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
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


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True,
        help_text="تکرار رمز عبور",
        error_messages={
            'required': 'تکرار رمز عبور الزامی است.'
        }
    )

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'username': {
                'min_length': 3,
                'max_length': 30,
                'error_messages': {
                    'unique': 'این نام کاربری قبلاً انتخاب شده است.',
                    'min_length': 'نام کاربری باید حداقل ۳ کاراکتر باشد.',
                    'max_length': 'نام کاربری نباید بیشتر از ۳۰ کاراکتر باشد.',
                    'required': 'وارد کردن نام کاربری الزامی است.'
                }
            },
            'email': {
                'error_messages': {
                    'unique': 'این ایمیل قبلاً ثبت شده است.',
                    'invalid': 'لطفاً یک ایمیل معتبر وارد کنید.',
                    'required': 'وارد کردن ایمیل الزامی است.'
                }
            },
            'password': {
                'write_only': True,
                'error_messages': {'required': 'وارد کردن رمز عبور الزامی است.'}
            },
        }

        def validate_username(self, value):
            return value.lower().strip()

        def validate_email(self, value):
            return value.lower().strip()

    def validate_password(self, value):
        try:
            validate_password(value, user=CustomUser)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')

        if password and password2 and password != password2:
            raise serializers.ValidationError({'password2': "پسوردها مطابقت ندارند."})

        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        return CustomUser.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate_username(self, value):
        username = value.lower().strip()

        if not CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': ["این نام کاربری در سیستم وجود ندارد."]})
        return username

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if not user:
                raise serializers.ValidationError({'password': ["رمز عبور وارد شده اشتباه است."]})
        return data


class UserCredentialsUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, max_length=150)
    username = serializers.CharField(required=False, max_length=150)
    current_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({'current_password': ["پسورد فعلی وارد شده اشتباه است."]})
        return value

    def validate(self, data):
        user = self.context['request'].user
        new_username = data.get('username')

        if new_username and new_username != user.username:
            if CustomUser.objects.filter(username=new_username).exists():
                raise serializers.ValidationError({'username' : ['این یوزرنیم در حال حاضر وجود دارد.']})

            if len(new_username) > 30:
                raise serializers.ValidationError({'username': ["نام کاربری نباید بیشتر از ۳۰ کاراکتر باشد."]})

            if len(new_username) < 3:
                raise serializers.ValidationError({'username': ["نام کاربری نباید کمتر از ۳ حرف باشد."]})

        new_email = data.get('email')
        if new_email and new_email != user.email:
            if CustomUser.objects.filter(email=new_email).exists():
                raise serializers.ValidationError({'email' : ['این ایمیل در حال حاضر وجود دارد.']})

        if not new_username and not new_email:
            raise serializers.ValidationError({'non_field_errors': ['حداقل یکی از فیلد های ایمیل یا یوزرنیم برای اپدیت باید پر شده باشد.']})

        return data

    def update(self, instance, validated_data):
        email = validated_data.get('email')
        username = validated_data.get('username')

        if email:
            instance.email = email
        if username:
            instance.username = username

        instance.save()
        return instance

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    new_password_confirm = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError({'old_password': ["پسورد فعلی وارد شده اشتباه است."]})
        return value

    def validate(self, data):
        new_password = data.get('new_password')
        new_password_confirm = data.get('new_password_confirm')

        if new_password != new_password_confirm:
            raise serializers.ValidationError({'new_password_confirm': ["پسورد ها باهم فرق میکنند."]})

        try:
            validate_password(new_password, self.context['request'].user)
        except DjangoValidationError as e:
            raise serializers.ValidationError({'new_password': list(e.messages)})

        return data

    def save(self):
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
            raise serializers.ValidationError({"current_password": ["پسورد فعلی وارد شده اشتباه است."]})
        return value

    def validate_phone_number(self, value):
        user = self.context['request'].user

        if value != user.phone_number:
            if CustomUser.objects.filter(phone_number=value).exists():
                raise serializers.ValidationError({"phone_number": ['این شماره تلفن در حال حاضر وجود دارد.']})
        return value

    def update(self, instance, validated_data):
        instance.phone_number = validated_data['phone_number']
        instance.save()
        return instance