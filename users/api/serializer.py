from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import TrainerAccount, RegularAccount, TrainerAskUserToken, UserAskTrainerToken

#This is the User Serializer; since the user the primary account data we must
#call this serializer from inside our TrainerSerializer and RegularUserProfileViewSerializer
#in order the information assocatied with a given user.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name')

#This is our Serializer for a regular user, one that is not a Trainer, this
#serialzer contains all the relevant information assocatied with a given person.
#This serialzed information is sent out the the front end after a successful login.
class RegularSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = RegularAccount
        fields = ('id','level','auth_token', 'trainer','user','goal','profile_pic', 'is_searchable')

#This Serializer provides a stripped down view of a Regular user so that the
#information can be displayed in a public setting, such as a profile for a given
#user.
class RegularUserProfileViewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = RegularAccount
        fields = ('user', 'profile','goal', 'profile_pic')

#This is our Serializer for a trainer. This contains all the relevant information
#assocatied with a given Trainer and sends it out upon successful login.
class TrainerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    #Pulls all clients using the relationship established in the db
    clients = RegularUserProfileViewSerializer(many=True, read_only=True)
    class Meta:
        model = TrainerAccount
        fields = ('id','level','auth_token','user', 'clients','past_experience','profile_pic')

#This Serializer gives a Trainer access to THEIR clients. It uses the RegularUserProfileViewSerializer,
#which provides a stripped down view of the user.
class ClientSerializer(serializers.ModelSerializer):
    clients = RegularUserProfileViewSerializer(many=True, read_only=True)
    class Meta:
        model = TrainerAccount
        fields = ('clients',)

#This Serializer provides a stripped down view of a Trainer so that the Trainer's
#information can be displayed in a public setting without compromising their
#privacy.
class TrainerProfileViewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TrainerAccount
        fields = ('user', 'profile','past_experience', 'profile_pic')

#This Serializer is for getting the information from tokens that where sent
#by a Trainer to a prospective User.
class TrainerAskUserTokenSerializer(serializers.ModelSerializer):
    trainer_account = TrainerProfileViewSerializer(source='trainer')
    user_account = RegularUserProfileViewSerializer(source='rglr_user')
    class Meta:
        model = TrainerAskUserToken
        fields=('id','user_account','trainer_account')

#This Serializer is for getting the information from tokens that where sent
#by a User to a prospecitve Trainer.
class UserAskTrainerTokenSerializer(serializers.ModelSerializer):
    trainer_account = TrainerProfileViewSerializer(source='trainer')
    user_account = RegularUserProfileViewSerializer(source='rglr_user')
    class Meta:
        model = UserAskTrainerToken
        fields=('id','user_account','trainer_account')
