from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^get_trainees$', views.api_get_trainees),
    url(r'^get_user$', views.api_get_user),
    url(r'^find_users$', views.api_find_users),
    url(r'^update_searchability$', views.api_update_searchability),
]
