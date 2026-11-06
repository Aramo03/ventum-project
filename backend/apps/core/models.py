from django.db import models
from .languages import LANGUAGE_CHOICES

class BaseTranslation(models.Model):
    """
    If the requested language is unavailable,
    use English (en), otherwise any existing translation.
    The object must not disappear.
    """

    language = models.CharField(max_length=2,choices=LANGUAGE_CHOICES)

    class Meta:
        abstract = True