from django.db import models

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "newsletter subscriber"
        verbose_name_plural = "newsletter subscribers"
        ordering = ("-created_at",)

    def __str__(self):
        return self.email


class WholesaleInquiry(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "wholesale inquiry"
        verbose_name_plural = "wholesale inquiries"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.name} ({self.email})"