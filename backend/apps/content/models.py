from django.db import models

from apps.core.models import BaseTranslation


class HomeBlock(models.Model):
    class SlotChoices(models.TextChoices):
        HERO = "hero", "Hero"
        STORES = "stores", "Stores"

    slot = models.CharField(max_length=20, choices=SlotChoices.choices)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("order", "id")
        verbose_name = "Home block"
        verbose_name_plural = "Home blocks"

    def __str__(self):
        return f"{self.get_slot_display()} (#{self.order})"


class HomeBlockTranslation(BaseTranslation):
    home_block = models.ForeignKey(
        HomeBlock,
        on_delete=models.CASCADE,
        related_name="translations",
    )
    title = models.CharField(max_length=255)
    text = models.TextField()

    class Meta:
        ordering = ("language",)
        verbose_name = "Home block translation"
        verbose_name_plural = "Home block translations"
        constraints = [
            models.UniqueConstraint(
                fields=("home_block", "language"),
                name="unique_homeblock_translation_language",
            ),
        ]

    def __str__(self):
        return f"{self.home_block} — {self.language}"
