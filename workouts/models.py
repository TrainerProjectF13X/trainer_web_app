from django.db import models

# Create your models here.

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

class Userwithworkouts(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE )


# Create your models here.
class Savedworkouts(models.Model):
    owner= models.ForeignKey(Userwithworkouts, on_delete=models.CASCADE,related_name='workouts')

    overview = models.TextField(default="Standard Workout")

    pic = models.ImageField(blank=True,null=True)

class Savedactivity(models.Model):
    owner = models.ForeignKey(Savedworkouts, on_delete=models.CASCADE, related_name='activities')
    name = models.TextField( default="Cardial Burning")
    detail = models.TextField(default="run for 100 miles")
