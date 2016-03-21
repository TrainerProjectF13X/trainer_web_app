from django.http import JsonResponse, HttpResponse
from .serializer import ClientSerialzer, TrainerSerialzer, RegularSerialzer, RegularUserProfileViewSerialer, TrainerProfileViewSerialer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.renderers import JSONRenderer
from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

from ..models import TrainerAccount, RegularAccount
from django.db.models import Q


@api_view(['GET'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_get_trainees(request, format=None):
    if request.method == 'GET':
        try:
            trainer = request.user.traineraccount
            serialized_data = ClientSerialzer(trainer).data
            return JsonResponse(serialized_data);
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
            serialized_data = RegularSerialzer(regular_user).data
            return JsonResponse(serialized_data)
        except ObjectDoesNotExist:
            pass
        try:
            trainer_user = current_user.traineraccount
            serialized_data = TrainerSerialzer(trainer_user).data
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
        search_for = request.GET['search_for']
        search_string = request.GET['search_string']
        if search_for == 'TRAINEE':
            qs = RegularAccount.objects.filter(is_searchable=True).filter(trainer__isnull=True)
            qs = qs.filter(Q(user__email__icontains      = search_string) |
                           Q(user__username__icontains   = search_string))
            serialized_data = RegularUserProfileViewSerialer(qs, many=True, read_only=True).data
            serialized_data = JSONRenderer().render(serialized_data)
            return HttpResponse(serialized_data, content_type='application/json')
        else:
            qs = TrainerAccount.objects.all()
            qs = qs.filter(Q(user__email__icontains      = search_string) |
                           Q(user__username__icontains   = search_string))
            serialized_data = TrainerProfileViewSerialer(qs, many=True, read_only=True).data
            serialized_data = JSONRenderer().render(serialized_data)
            return HttpResponse(serialized_data, content_type='application/json')
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
