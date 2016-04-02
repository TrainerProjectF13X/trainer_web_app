from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Userwithworkouts, Savedworkouts,Savedactivity

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name')


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Savedactivity
        fields = ('name','detail')




class WorkoutSerializer(serializers.ModelSerializer):

    activities = ActivitySerializer(many = True ,read_only= True)
    class Meta:
        model = Savedworkouts
        fields = ('overview','activities')




class UserwithworkoutsSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    workouts = WorkoutSerializer(many=True, read_only= True)
    class Meta:
        model = Userwithworkouts
        fields = ('user','workouts')
