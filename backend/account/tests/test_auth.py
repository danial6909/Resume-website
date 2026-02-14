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