from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import TrainerAccount, RegularAccount


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name')

class RegularSerialzer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = RegularAccount
        fields = ('id','level','auth_token', 'trainer','user')

class RegularUserViewSerialer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = RegularAccount
        fields = ('user', 'profile')

class TrainerSerialzer(serializers.ModelSerializer):
    user = UserSerializer()
    clients = RegularUserViewSerialer(many=True, read_only=True)
    class Meta:
        model = TrainerAccount
        fields = ('id','level','auth_token','user', 'clients')
