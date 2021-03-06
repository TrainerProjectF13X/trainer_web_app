from django.http import JsonResponse, HttpResponse

from .serializer import (ClientSerializer,
                         TrainerSerializer,
                         RegularSerializer,
                         RegularUserProfileViewSerializer,
                         TrainerProfileViewSerializer,
                         TrainerAskUserTokenSerializer,
                         UserAskTrainerTokenSerializer)

from django.core.exceptions import ObjectDoesNotExist
from rest_framework.renderers import JSONRenderer
from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User

from ..models import (TrainerAccount,
                      RegularAccount,
                      TrainerAskUserToken,
                      UserAskTrainerToken)

from django.db.models import Q


@api_view(['GET'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_get_trainees(request, format=None):
    if request.method == 'GET':
        try:
            trainer = request.user.traineraccount
            serialized_data = ClientSerializer(trainer).data
            serialized_data = JSONRenderer().render(serialized_data)
            return HttpResponse(serialized_data, content_type='application/json')
        except ObjectDoesNotExist:
            return HttpResponse('Forbidden', status=403)
    return HttpResponse('Unauthorized', status=401)


@api_view(['GET'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_get_user(request, format=None):
    if request.method == 'GET':
        current_user = request.user
        try:
            regular_user = current_user.regularaccount
            serialized_data = RegularSerializer(regular_user).data
            return JsonResponse(serialized_data)
        except ObjectDoesNotExist:
            pass
        try:
            trainer_user = current_user.traineraccount
            serialized_data = TrainerSerializer(trainer_user).data
            return JsonResponse(serialized_data)
        except ObjectDoesNotExist:
            return HttpResponse('Unauthorized', status=401)
        return HttpResponse('Unauthorized', status=401)
    return HttpResponse('Unauthorized', status=401)


@api_view(['GET'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_find_users(request, format=None):
    if request.method == 'GET':
        #Sent with the AJAX request
        search_for = request.GET['search_for']
        search_string = request.GET['search_string']

        #Alias for our user
        current_user = request.user
        if search_for == 'TRAINEE':
            #Get the trainer this is used for a later query.
            #Fail out if not found.
            try:
                trainer = current_user.traineraccount
            except ObjectDoesNotExist:
                HttpResponse('Unauthorized', status=401)

            #Find all searchable Users who do not have a trainer.
            qs = RegularAccount.objects.filter(is_searchable=True).filter(trainer__isnull=True)
            #A super basic search Query for now.
            qs = qs.filter(Q(user__email__icontains      = search_string) |
                           Q(user__username__icontains   = search_string))

            #Now loop through valid results in order to ensure that
            #1. A person that a trainer has asked to train does not show up again.
            #2. A user has asked for this particular trainer does not appear.
            for ele in qs:
                #Trainer has already asked this person
                if TrainerAskUserToken.objects.filter(rglr_user=ele, trainer=trainer).exists():
                    qs = qs.exclude(user__username=ele.user.username)
                #The User has asked the Trainer already and the results is pending.
                elif UserAskTrainerToken.objects.filter(rglr_user=ele,trainer=trainer).exists():
                    qs = qs.exclude(user__username=ele.user.username)

            serialized_data = RegularUserProfileViewSerializer(qs, many=True, read_only=True).data
            serialized_data = JSONRenderer().render(serialized_data)
            return HttpResponse(serialized_data, content_type='application/json')
        else:
            #Get the Regular User this is used for a later query.
            #Fail out if not found.
            try:
                rglr_user = current_user.regularaccount
            except ObjectDoesNotExist:
                HttpResponse('Unauthorized', status=401)

            qs = TrainerAccount.objects.all()
            qs = qs.filter(Q(user__email__icontains      = search_string) |
                           Q(user__username__icontains   = search_string))

            #Now loop through valid results in order to ensure that
            #1. A person that a trainer has asked to train does not show up again.
            #2. A user has asked for this particular trainer does not appear.
            #3. A this person is already being trained by that person
            for ele in qs:
                #Trainer has already asked this person and result is pending
                if TrainerAskUserToken.objects.filter(rglr_user=rglr_user, trainer=ele).exists():
                    qs = qs.exclude(user__username=ele.user.username)
                #The User has asked the Trainer already and the results is pending.
                elif UserAskTrainerToken.objects.filter(rglr_user=rglr_user,trainer=ele).exists():
                    qs = qs.exclude(user__username=ele.user.username)
                elif rglr_user.trainer == ele:
                    qs = qs.exclude(user__username=ele.user.username)

            serialized_data = TrainerProfileViewSerializer(qs, many=True, read_only=True).data
            serialized_data = JSONRenderer().render(serialized_data)
            return HttpResponse(serialized_data, content_type='application/json')
    return HttpResponse('Unauthorized', status=401)


@api_view(['GET'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_get_tokens(request, format=None):
    if request.method == 'GET':
        current_user = request.user
        try:
            regular_user = current_user.regularaccount
            #Get all the possible outstanding tokens associated with this particular
            #user.
            qs_recieved = TrainerAskUserToken.objects.filter(rglr_user=regular_user)
            qs_sent = UserAskTrainerToken.objects.filter(rglr_user=regular_user)
            #Using our Serializer serialize the data, and extract.
            recieved_serialized=TrainerAskUserTokenSerializer(qs_recieved,many=True).data
            sent_serialized=UserAskTrainerTokenSerializer(qs_sent, many=True).data
            #From here convert to standard JSON format
            send_data = JSONRenderer().render({'recieved' : recieved_serialized, 'sent' : sent_serialized})
            return HttpResponse(send_data, content_type='application/json')
        except ObjectDoesNotExist:
            pass
        try:
            trainer = current_user.traineraccount

            qs_recieved = UserAskTrainerToken.objects.filter(trainer=trainer)
            qs_sent = TrainerAskUserToken.objects.filter(trainer=trainer)

            recieved_serialized=UserAskTrainerTokenSerializer(qs_recieved,many=True).data
            sent_serialized=TrainerAskUserTokenSerializer(qs_sent, many=True).data

            send_data = JSONRenderer().render({'recieved' : recieved_serialized, 'sent' : sent_serialized})
            return HttpResponse(send_data, content_type='application/json')
        except ObjectDoesNotExist:
            return HttpResponse('Forbidden', status=403)

    return HttpResponse('Unauthorized', status=401)

@api_view(['POST'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_update_searchability(request, format=None):
    if request.method == 'POST':
        current_user = request.user
        try:
            regular_user = current_user.regularaccount
            regular_user.is_searchable = not regular_user.is_searchable
            regular_user.save()
            return HttpResponse(status=201)
        except ObjectDoesNotExist:
            return HttpResponse('Forbidden', status=403)
    return HttpResponse('Unauthorized', status=401)


@api_view(['POST'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_training_request(request, format=None):
    if request.method == 'POST':
        current_user = request.user
        search_username = request.POST['username']
        try:
            regular_user = current_user.regularaccount
            trainer = User.objects.get(username=search_username).traineraccount
            token = UserAskTrainerToken(rglr_user=regular_user,trainer=trainer)
            token.save()
            return HttpResponse(status=201)
        except ObjectDoesNotExist:
            pass
        try:
            trainer = current_user.traineraccount
            regular_user = User.objects.get(username=search_username).regularaccount
            token = TrainerAskUserToken(trainer=trainer,rglr_user=regular_user)
            token.save()
            return HttpResponse(status=201)
        except ObjectDoesNotExist:
            pass
    return HttpResponse('Unauthorized', status=401)


@api_view(['POST'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def add_client_to_trainer(request, format=None):
    if request.method == 'POST':
        current_user = request.user
        token_id = request.POST['token_id']
        try:
            regular_user = current_user.regularaccount
            trainer = TrainerAskUserToken.objects.get(id=token_id).trainer
            regular_user.trainer = trainer
            regular_user.save()
            UserAskTrainerToken.objects.filter(rglr_user=regular_user).delete()
            TrainerAskUserToken.objects.filter(rglr_user=regular_user).delete()
            return HttpResponse(status=201)
        except ObjectDoesNotExist:
            pass
        try:
            trainer = current_user.traineraccount
            regular_user = UserAskTrainerToken.objects.get(id=token_id).rglr_user
            regular_user.trainer = trainer
            regular_user.save()
            UserAskTrainerToken.objects.filter(rglr_user=regular_user).delete()
            TrainerAskUserToken.objects.filter(rglr_user=regular_user).delete()
            return HttpResponse(status=201)
        except ObjectDoesNotExist:
            pass
    return HttpResponse('Unauthorized', status=401)
