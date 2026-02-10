from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status


User = get_user_model()

class AuthenticationTests(APITestCase):

    def setUp(self):
        """
        this method is used to create test user
        """
        self.username = "testuser"
        self.password = "TestPass@123"
        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
            email="testi@example.com"
        )

        self.login_url = reverse('login')
        self.profile_url = reverse('profile')
        self.refresh_url = reverse('token_refresh')

    def test_login_sets_cookies(self):
        """
        we check if in successful login , does cookies sets correctly or not
        """

        data = {
            'username': self.username,
            'password': self.password,
        }
        response = self.client.post(self.login_url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)

        self.assertEqual(response.data['status'], "success")

    def test_access_token_expired_leads_to_successful_refresh(self):
        """
                تست سناریوی اصلی:
                ۱. لاگین
                ۲. حذف اکسس توکن (شبیه‌سازی انقضا)
                ۳. دریافت ۴۰۱ از پروفایل
                ۴. درخواست به ریفرش اپی‌آی و دریافت اکسس توکن جدید
        """
