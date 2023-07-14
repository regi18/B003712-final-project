from django.contrib import admin

from articles.models import Article, PdfIssue, Section

# Register your models here.
admin.site.register(Article)
admin.site.register(PdfIssue)
admin.site.register(Section)