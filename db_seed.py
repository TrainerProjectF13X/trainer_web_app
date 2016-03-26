#This is a file intended to make the seeding of the database easier and quicker

#Written by Christopher Ogle on 3/25/2016

#If modified please fill out below so that other users may know what changes occured
#In addition please follow the syling guidlines as shown below
'''Modefied on'''

import os, django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trainerproject.settings")
django.setup()

from django.contrib.auth.models import User
from users.models import TrainerAccount, RegularAccount, TrainerAskUserToken, UserAskTrainerToken
