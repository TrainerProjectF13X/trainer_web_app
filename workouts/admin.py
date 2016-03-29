from django.contrib import admin
from .models import Savedworkouts,Userwithworkouts,Savedactivity
# Register your models here.

admin.site.register(Savedworkouts)
admin.site.register(Userwithworkouts)
admin.site.register(Savedactivity)