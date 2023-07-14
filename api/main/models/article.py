from django.db import models
from main.models.section import Section


class Article(models.Model):
    # The article's slug and primary key
    slug = models.SlugField(max_length=100, primary_key=True)
    # The title of the article
    title = models.CharField(max_length=100)
    # The article's author
    author = models.CharField(max_length=100)
    # The date the article was published
    date = models.DateTimeField("date published", auto_now_add=True)
    # The URL of the article's main image
    imgSrc = models.CharField(max_length=100)
    # The article's content
    content = models.TextField()
    # The article's issue number
    issueNumber = models.IntegerField()
    # The section of the article
    section = models.ForeignKey(Section, on_delete=models.PROTECT)

    class Meta:
        ordering = ['-date']

