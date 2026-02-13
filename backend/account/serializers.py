from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from rest_framework import serializers
from .models import Profile, EmailVerification
from django.templatetags.static import static
from django.core.exceptions import ValidationError as DjangoValidationError
from drf_spectacular.utils import extend_schema_field, inline_serializer
from django.contrib.auth.hashers import make_password



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
    username = serializers.CharField(read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['username', 'image']

    @extend_schema_field(serializers.URLField())
    def get_image(self, obj):
        request = self.context.get('request')

        image_url = None
        try:
            if obj.profile.image:
                image_url = obj.profile.image.url
            else:
                image_url = static('images/profile_pics/profile_image_default.png')
        except AttributeError:
            image_url = static('images/profile_pics/profile_image_default.png')

        if request and image_url:
            image_url = request.build_absolute_uri(image_url)

        return image_url


class EmailVerificationSerializer(serializers.Serializer):
    code = serializers.CharField(required=True, min_length=6, max_length=6)

    def validate(self, data):
        code = data.get('code')
        email = self.context['request'].COOKIES.get('user_email_pending')

        if not email:
            raise serializers.ValidationError({"code": ["اطلاعات نشست شما منقضی شده است."]})

        verification = EmailVerification.objects.filter(email=email, code=code).first()
        if not verification:
            raise serializers.ValidationError({"code": ["کد وارد شده اشتباه است یا وجود ندارد."]})

        if verification.is_expired():
            raise serializers.ValidationError({"code": ["کد منقضی شده است. لطفاً درخواست کد جدید بدهید."]})

        # we write a new object so we can access verification in save method
        data['verification_obj'] = verification
        return data

    def save(self, **kwargs):
        verification = self.validated_data['verification_obj']

        # If user want to Register
        if verification.username and verification.password:

            user = CustomUser.objects.create_user(
                username=verification.username,
                email=verification.email,
                password=verification.password
            )

        else:

            # If user want to Log in
            user = CustomUser.objects.get(email=verification.email)

        # we clear temporary table created.
        verification.delete()

        return user

class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'username': {
                'min_length': 3,
                'max_length': 30,
            },
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'},
            },
        }

    def validate_username(self, value):
        username = value.lower().strip()

        if CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError(["این نام کاربری قبلاً انتخاب شده است."])

        return username

    def validate_email(self, value):
        email = value.strip().lower()

        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError(["این ایمیل قبلاً ثبت شده است."])

        return email

    def validate_password(self, value):
        """
        استفاده از Django Password Validators که در settings تعریف شدن
        خطاها توسط translate_error_message در utils ترجمه میشن
        """
        try:
            # استفاده از validator های تعریف شده در settings.AUTH_PASSWORD_VALIDATORS
            validate_password(value)
        except DjangoValidationError as e:
            # خطاها رو از utils.translate_error_message رد می‌کنیم
            from .utils import translate_error_message
            translated_errors = [translate_error_message(msg) for msg in e.messages]
            raise serializers.ValidationError(translated_errors)
        return value

    def validate(self, data):
        errors = {}

        password = data.get('password', '')
        password2 = data.get('password2', '')

        if password and password2 and password != password2:
            raise serializers.ValidationError({
                'password2': ["رمز عبورها مطابقت ندارند."]
            })

        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        validated_data['password'] = make_password(validated_data['password'])
        return validated_data


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(style={'input_type': 'password'}, required=True)

    def validate_username(self, value):
        username = value.lower().strip()

        if not CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError(["این نام کاربری در سیستم وجود ندارد."])
        return username

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if not user:
                raise serializers.ValidationError({'password': ["رمز عبور وارد شده اشتباه است."]})

            data['user'] = user
        return data


class UserCredentialsUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, max_length=150)
    username = serializers.CharField(required=False, max_length=150)
    current_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(["پسورد فعلی وارد شده اشتباه است."])
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
            raise serializers.ValidationError(["پسورد فعلی وارد شده اشتباه است."])
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
            raise serializers.ValidationError(["پسورد فعلی وارد شده اشتباه است."])
        return value

    def validate_phone_number(self, value):
        user = self.context['request'].user

        if value != user.phone_number:
            if CustomUser.objects.filter(phone_number=value).exists():
                raise serializers.ValidationError(['این شماره تلفن در حال حاضر وجود دارد.'])
        return value

    def update(self, instance, validated_data):
        instance.phone_number = validated_data['phone_number']
        instance.save()
        return instance