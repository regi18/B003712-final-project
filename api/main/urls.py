from django.urls import path
from main.views import articles_view, cartoons_view, sections_view, downloads_view
from main.views.auth_view import LoginView, LogoutView

urlpatterns = [
    path('articles/', articles_view.ArticlesView.as_view()),
    path('articles/<pk>/', articles_view.ArticleDetailView.as_view()),

    path('issues/', articles_view.getIssueNumbers),

    path('downloads/latest/', downloads_view.getLatestPdfIssue),
    path('downloads/', downloads_view.DownloadsView.as_view()),
    path('downloads/<int:pk>/', downloads_view.DownloadDetailView.as_view()),

    path('sections/', sections_view.SectionsView.as_view()),
    path('sections/order/', sections_view.updateOrder),
    path('sections/<pk>/', sections_view.SectionDetailView.as_view()),

    path('cartoons/', cartoons_view.CartoonsView.as_view()),
    path('cartoons/<pk>/', cartoons_view.CartoonDetailView.as_view()),

    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
