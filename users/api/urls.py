from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^get_trainees$', views.api_get_trainees),
    url(r'^get_user$', views.api_get_user),
    url(r'^find_users$', views.api_find_users),
    url(r'^update_searchability$', views.api_update_searchability),
    url(r'^training_request$', views.api_training_request),
    url(r'^get_pending_tokens$', views.api_get_tokens),
    url(r'^add_client_to_trainer$', views.add_client_to_trainer),
]
