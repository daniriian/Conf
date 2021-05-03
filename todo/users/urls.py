from django.urls import path, include
from .views import getCSRFToken, LoginView, LogoutView, GetUsersView, CheckAuthenticationView


urlpatterns = [
    path('authenticated', CheckAuthenticationView.as_view()),
    path('csrf_cookie', getCSRFToken.as_view(), name='csrf'),
    path('login', LoginView.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name='api-logout'),
    path('users', GetUsersView.as_view()),

]
