from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import TrainerAccount, RegularAccount


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name')

class TrainerSerialzer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TrainerAccount
        fields = ('id','auth_token','user')

class RegularSerialzer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = RegularAccount
        fields = ('id','auth_token', 'trainer','user')
