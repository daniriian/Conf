from django.urls import path, include


from . import views


urlpatterns = [
    # path('register/', registration_view, name="register"),
    # path('logout/', logout_view, name="logout"),
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name="login"),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.SessionView.as_view(), name='api-session'),
    path('whoami/', views.WhoAmIView.as_view(), name='api-whoami'),
    # path('home/', home, name="home"),
    # path('profile/', account_view, name="account"),
]
