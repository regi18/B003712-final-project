from django.urls import path
from . import views

urlpatterns = [
    path('', views.ArticleView.as_view()),
    path('<pk>/', views.ArticleDetailView.as_view()),

    path('<slug:slug>/', views.showArticle),
    path('download/latest/', views.getLatestPdfIssue),
    path('download/', views.getPdfIssues),
]
