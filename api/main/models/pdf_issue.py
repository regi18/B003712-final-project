from django.db import models

class PdfIssue(models.Model):
    issueNumber = models.IntegerField()
    pdf = models.FileField(upload_to='pdfIssues')
    createdAt = models.DateField(auto_now_add=True)

    class Meta:
        get_latest_by = ['createdAt']
