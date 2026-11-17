from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from django.test import TestCase

User = get_user_model()


class UserModelTests(TestCase):
    def test_username_field_is_email(self):
        self.assertEqual(User.USERNAME_FIELD, "email")

    def test_create_user_with_email_login(self):
        user = User.objects.create_user(
            email="ashot@example.com",
            password="secret-pass",
        )
        self.assertEqual(user.email, "ashot@example.com")
        self.assertTrue(user.check_password("secret-pass"))
        self.assertIsNone(user.username)

    def test_email_must_be_unique(self):
        User.objects.create_user(email="dup@example.com", password="secret-pass")
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                User.objects.create_user(email="dup@example.com", password="other-pass")
