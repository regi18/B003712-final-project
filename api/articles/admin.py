from django.contrib import admin

from articles.models import Article, PdfIssue

# Register your models here.
admin.site.register(Article)
admin.site.register(PdfIssue)