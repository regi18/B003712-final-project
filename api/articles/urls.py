from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<slug:slug>/', views.show),
    path('download/latest/', views.getLatestPdfIssue),
    path('download/', views.getPdfIssues),
]