from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^login$', views.user_login, name="login"),
    url(r'^logout_user$', views.logout_user, name="logout"),
    url(r'^sign_up$', views.sign_up, name="sign_up"),
    url(r'^(?P<id>\d+)/$', views.profile_page, name="profile_page"),
]
