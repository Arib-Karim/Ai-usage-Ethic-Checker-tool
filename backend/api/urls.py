from django.urls import path
from . import views

urlpatterns = [
    path('check/', views.check_ethics, name='check_ethics'),
]
