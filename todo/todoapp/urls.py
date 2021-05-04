from django.urls import path
from . import views

urlpatterns = [

    path("vc", views.GetVCListView.as_view()),
    path("<int:todo_id>", views.VideoDetailsView.as_view()),
    path("adauga", views.AddVideoconferenceView.as_view()),
    # path("create/", views.TodoCreateView),
    path("callers", views.CallersListView.as_view()),
    path("terminals", views.TerminalListView.as_view()),
    path("delete", views.VideoDeleteView.as_view()),
    path("scraper/", views.call_to_ip),
    #     path('delete/<int:todo_id>', views.delete, name='delete'),
    #     path('mark_complete/<int:todo_id>',
    #          views.mark_complete, name='mark_complete'),
    #     path('mark_incomplete/<int:todo_id>',
    #          views.mark_incomplete, name='mark_incomplete'),
    #     path('edit/<int:todo_id>', views.edit, name="edit"),
    #     path('add_conference', views.add_conference, name='add_conference'),
    #     path('<int:todo_id>/detalii/', views.detalii, name="detalii"),
]
