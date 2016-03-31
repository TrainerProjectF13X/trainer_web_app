from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^get_userwithworkouts$', views.workout_api_get_userwithworkouts),

]
