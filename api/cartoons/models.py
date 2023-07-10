from django.db import models

class Cartoon(models.Model):
    imgSrc = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    createdAt = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-id']