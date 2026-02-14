from django.urls import reverse
from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase
from account.models import EmailVerification, CustomUser


class AuthenticationTests(APITestCase):

    def setUp(self):
        # Necessary Urls we need
        self.register_url = reverse('account:register')
        self.verify_url = reverse('account:verify_email')
        self.login_url = reverse('account:login')
        self.logout_url = reverse('account:logout')

        # instance data for tests
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "TestPassword@123",
            "password2": "TestPassword@123"
        }

    def test_register_success(self):
        # Fist level of sign up and creating temporary table records.
        response = self.client.post(self.register_url, data=self.user_data)

        # Check the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')

        # Check database for temporary table record.
        self.assertTrue(EmailVerification.objects.filter(email=self.user_data['email']).exists())

        # Check if Email is in the que for being sending to user.
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn(self.user_data['email'], mail.outbox[0].to)

    def test_verify_email_success(self):
        # Now we check if user finally is registered by he's code

        # First do the signup forms request
        self.client.post(self.register_url, data=self.user_data)

        # Input user's verification code by accessing to database
        verification_record = EmailVerification.objects.get(email=self.user_data['email'])
        valid_code = verification_record.code

        # Sending code to verify-email API to check the code.
        response = self.client.post(self.verify_url, data={'code': valid_code})

        # Check response from API verify-email.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'success')

        # Check if user exist in main database
        self.assertTrue(CustomUser.objects.filter(username=self.user_data['username']).exists())

        # Check JWT cookies does exist
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)

        # Check cookie if they are Httponly or not
        self.assertTrue(response.cookies['access_token']['httponly'])
        self.assertTrue(response.cookies['refresh_token']['httponly'])

    def test_login_full_flow_success(self):
        # We Check if login check the data sent to it and the 2fa verification.

        # We make a real User first.
        CustomUser.objects.create_user(
            username=self.user_data['username'],
            email=self.user_data['email'],
            password=self.user_data['password']
        )

        # Sending Username and Password
        login_data = {
            "username": self.user_data['username'],
            "password": self.user_data['password']
        }
        response = self.client.post(self.login_url, data=login_data)

        # Check if code sent to user email or not
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')

        # Check if email cookie exist
        verification_cookie = response.cookies.get('user_email_pending')
        self.assertIsNotNone(verification_cookie, "کوکی تایید ایمیل صادر نشد!")

        # Extract Code from database
        verification_record = EmailVerification.objects.get(email=self.user_data['email'])
        login_code = verification_record.code

        # Send Code to verify-email
        response_verify = self.client.post(self.verify_url, data={'code': login_code})

        # Final Check for log in success
        self.assertEqual(response_verify.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response_verify.cookies)
        self.assertIn('refresh_token', response_verify.cookies)

        # Check if all cookies are exist
        self.assertTrue(response_verify.cookies['access_token']['httponly'])
        self.assertTrue(response_verify.cookies['refresh_token']['httponly'])

    def test_logout_clears_all_cookies(self):

        user = CustomUser.objects.create_user(
            username="logoutuser",
            email="logout@example.com",
            password="TestPassword@123"
        )
        self.client.force_authenticate(user=user)

        # ۲. ارسال درخواست خروج

        response = self.client.post(self.logout_url)

        # ۳. بررسی وضعیت پاسخ
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')

        # ۴. بررسی فیزیکی پاک شدن کوکی‌ها در پاسخ سرور
        # در جنگو، وقتی کوکی حذف می‌شود، مقدار آن در پاسخ به "" (رشته خالی) تبدیل می‌شود
        self.assertEqual(response.cookies.get('access_token').value, "")
        self.assertEqual(response.cookies.get('refresh_token').value, "")
        self.assertEqual(response.cookies.get('sessionid').value, "")

        # اطمینان از اینکه تاریخ انقضا به گذشته ست شده است (برای حذف مرورگر)
        self.assertTrue(response.cookies.get('access_token')['expires'])