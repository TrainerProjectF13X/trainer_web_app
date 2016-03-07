from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^get_trainees$', views.api_get_trainees)
]
