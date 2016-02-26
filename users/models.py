from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.
User._meta.get_field('email')._unique = True

TRAINER = 'TRAINER'
TRAINEE = 'RGLRUSR'

class TrainerAccount(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    auth_token = models.CharField(max_length=56, unique=True, null=True)
    level =  models.CharField(max_length=7,default=TRAINER, editable=False)


class RegularAccount(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    auth_token = models.CharField(max_length=56, unique=True, null=True)
    level =  models.CharField(max_length=7,default=TRAINEE, editable=False)
    trainer = models.ForeignKey(TrainerAccount, null=True)
