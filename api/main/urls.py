from django.urls import path
from main.views import articles_view, cartoons_view, sections_view, downloads_view

urlpatterns = [
    path('articles/', articles_view.ArticlesView.as_view()),
    path('articles/<pk>/', articles_view.ArticleDetailView.as_view()),

    path('download/latest/', downloads_view.getLatestPdfIssue),
    path('download/', downloads_view.getPdfIssues),

    path('sections/', sections_view.SectionsView.as_view()),
    path('sections/<pk>/', sections_view.SectionDetailView.as_view()),

    path('cartoons/', cartoons_view.CartoonsView.as_view()),
    path('cartoons/<pk>/', cartoons_view.CartoonDetailView.as_view()),
]
