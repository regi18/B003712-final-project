from django.db import models

class PdfIssue(models.Model):
    issueNumber = models.IntegerField()
    url = models.CharField(max_length=100)
    createdAt = models.DateField(auto_now_add=True)

    class Meta:
        get_latest_by = ['createdAt']
