from django.contrib import admin
from .models import RegularAccount
from .models import TrainerAccount
# Register your models here

admin.site.register(RegularAccount)
admin.site.register(TrainerAccount)