from django.urls import path
from . import views

urlpatterns = [
    path("", views.todoListView),
    path("create/", views.TodoCreateView),
    path("callers/", views.callersView),
    path("terminals/", views.terminalsView),
    path("delete/", views.TodoDeleteView),
    #     path('delete/<int:todo_id>', views.delete, name='delete'),
    #     path('mark_complete/<int:todo_id>',
    #          views.mark_complete, name='mark_complete'),
    #     path('mark_incomplete/<int:todo_id>',
    #          views.mark_incomplete, name='mark_incomplete'),
    #     path('edit/<int:todo_id>', views.edit, name="edit"),
    #     path('add_conference', views.add_conference, name='add_conference'),
    #     path('<int:todo_id>/detalii/', views.detalii, name="detalii"),
]
