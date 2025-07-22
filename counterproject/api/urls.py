# counterapi/urls.py

# counterapi/urls.py

from django.urls import path
from .views import CounterView

urlpatterns = [
    path('counter/', CounterView.as_view(), name='counter'),
]