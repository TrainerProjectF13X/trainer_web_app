from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import TrainerAccount, RegularAccount

#This is the User Serializer; since the user the primary account data we must
#call this serializer from inside our TrainerSerialzer and RegularUserViewSerialer
#in order the information assocatied with a given user.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name')

#This is our Serializer for a regular user, one that is not a Trainer, this
#serialzer contains all the relevant information assocatied with a given person.
#This serialzed information is sent out the the front end after a successful login.
class RegularSerialzer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = RegularAccount
        fields = ('id','level','auth_token', 'trainer','user','goal','profile_pic')

#This Serializer provides a stripped down view of a Regular user so that the
#information can be displayed in a public setting, such as a profile for a given
#user. 
class RegularUserViewSerialer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = RegularAccount
        fields = ('user', 'profile')

#This is our Serializer for a trainer. This contains all the relevant information
#assocatied with a given Trainer and sends it out upon successful login.
class TrainerSerialzer(serializers.ModelSerializer):
    user = UserSerializer()
    clients = RegularUserViewSerialer(many=True, read_only=True)
    class Meta:
        model = TrainerAccount
        fields = ('id','level','auth_token','user', 'clients','pastExperience','profile_pic')

#This Serializer gives a Trainer access to THEIR clients. It uses the RegularUserViewSerialer,
#which provides a stripped down view of the user.
class ClientSerialzer(serializers.ModelSerializer):
    clients = RegularUserViewSerialer(many=True, read_only=True)
    class Meta:
        model = TrainerAccount
        fields = ('clients',)
