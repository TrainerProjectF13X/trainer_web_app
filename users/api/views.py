from django.http import JsonResponse, HttpResponse
from .serializer import ClientSerialzer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.renderers import JSONRenderer
from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def api_get_trainees(request, format=None):
    if request.method == 'GET':
        try:
            trainer = request.user.traineraccount
            serialized_data = ClientSerialzer(trainer).data
            #json = JSONRenderer().render(serialized_data)
            return JsonResponse(serialized_data);
        except ObjectDoesNotExist:
            return HttpResponse('Forbidden', status=403)
    return HttpResponse('Unauthorized', status=401)
