from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

# Create your models here.
User._meta.get_field('email')._unique = True

TRAINER = 'TRAINER'
TRAINEE = 'RGLRUSR'

class TrainerAccount(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    auth_token = models.CharField(max_length=56, unique=True, null=True)
    level =  models.CharField(max_length=7,default=TRAINER, editable=False)
    profile = models.TextField(default="User Profile")  # larger
    timestamp = models.DateTimeField(auto_now=True, auto_now_add=False, null=True)
    past_experience = models.TextField(default="Past Experience")
    profile_pic = models.ImageField( blank=True, null=True)
    def get_absolute_url(self):
        return reverse("public_profile_page",kwargs={"pk":self.id})

class RegularAccount(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    auth_token = models.CharField(max_length=56, unique=True, null=True)
    level =  models.CharField(max_length=7,default=TRAINEE, editable=False)
    trainer = models.ForeignKey(TrainerAccount, null=True, related_name="clients")
    profile = models.TextField(default="User Profile")  # larger
    timestamp = models.DateTimeField(auto_now=True, auto_now_add=False, null=True)
    goal = models.TextField(default="Goal")
    profile_pic = models.ImageField(null=True,blank=True)
    is_searchable = models.BooleanField(default=True, null=False)
    def get_absolute_url(self):
        return reverse("public_profile_page",kwargs={"pk":self.id})

class TrainerAskUserToken(models.Model):
    rglr_user = models.ForeignKey(RegularAccount, null=False)
    trainer   = models.ForeignKey(TrainerAccount, null=False)
    pending   = models.BooleanField(default=True, null=False)


class UserAskTrainerToken(models.Model):
    rglr_user = models.ForeignKey(RegularAccount, null=False)
    trainer   = models.ForeignKey(TrainerAccount, null=False)
    pending   = models.BooleanField(default=True, null=False)
