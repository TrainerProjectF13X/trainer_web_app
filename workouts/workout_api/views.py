from django.http import JsonResponse, HttpResponse
from .serializer import ActivitySerializer,UserSerializer,UserwithworkoutsSerializer,WorkoutSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.renderers import JSONRenderer
from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from ..models import Savedworkouts, Savedactivity, Userwithworkouts
from django.db.models import Q
@api_view(['GET'])
@authentication_classes((SessionAuthentication, ))
@permission_classes((IsAuthenticated, ))
def workout_api_get_userwithworkouts(request, format=None):
    if request.method == 'GET':
        current_user = request.user
        try:
            userworkouts = current_user.userwithworkouts
            serialized_data = UserwithworkoutsSerializer(userworkouts).data
            return JsonResponse(serialized_data)
        except ObjectDoesNotExist:
            return HttpResponse('caonima', status=404)
