from django.db import models

class Cartoon(models.Model):
    img = models.ImageField(upload_to='images/cartoons')
    title = models.CharField(max_length=100)
    createdAt = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-id']