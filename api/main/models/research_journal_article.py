from django.db import models


class ResearchJournalArticle(models.Model):
    title = models.CharField(max_length=100)
    createdAt = models.DateField(auto_now_add=True)
    content = models.TextField()

    class Meta:
        ordering = ['-createdAt']