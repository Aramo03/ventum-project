from django.db import models

from apps.core.languages import LANGUAGE_CHOICES


class BaseTranslation(models.Model):
    """
    Abstract row of translated text for one content language.

    Subclasses must add a ForeignKey to the parent object and enforce uniqueness
    on the pair (parent, language) via ``unique_together`` or a ``UniqueConstraint``.

    Translation selection rule:
    If there is no translation for the requested language, the parent object must
    remain in the API/admin result set. Choose display text from ``en``; if ``en`` is
    missing, use any translation that exists.

    RU: Нет перевода на язык запроса — объект не удаляется из выдачи; текст берётся
    из ``en``, иначе из любого перевода, который есть.

    HY: Եթե հարցված լեզվի թարգմանությունը բացակայում է, օբյեկտը չի հեռացվում
    արդյունքից. տեքստը վերցվում է ``en``-ից, այլապես ցանկացած առկա թարգմանությունից։
    """

    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)

    class Meta:
        abstract = True
