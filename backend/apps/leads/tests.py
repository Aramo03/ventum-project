from django.db import IntegrityError, transaction
from django.test import TestCase

from apps.leads.models import NewsletterSubscriber


class NewsletterSubscriberModelTests(TestCase):
    def test_subscriber_saves(self):
        subscriber = NewsletterSubscriber.objects.create(email="news@example.com")
        self.assertEqual(subscriber.email, "news@example.com")
        self.assertIsNotNone(subscriber.created_at)

    def test_duplicate_email_is_rejected(self):
        NewsletterSubscriber.objects.create(email="dup@example.com")
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                NewsletterSubscriber.objects.create(email="dup@example.com")
