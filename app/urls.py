from django.urls import path

from .views import *

urlpatterns = [
    path('', apioverview),
    path('task-list/', tasklist),
    path('task-detail/<int:pk>/', taskdetail),
    path('task-create/', taskcreate),
    path('task-update/<int:pk>/', taskupdate),
    path('task-delete/<int:pk>/', taskdelete),
]


