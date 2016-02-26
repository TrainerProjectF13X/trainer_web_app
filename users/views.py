import hashlib, time
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from .forms import LoginForm, SignUpForm
from django.core.urlresolvers import reverse

from django.contrib.auth.models import User
from .models import TrainerAccount, RegularAccount
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from .api.serializer import TrainerSerialzer, RegularSerialzer

# Create your views here.

def index(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profile_page', args=(request.user.id,)))
    return render(request, 'user/index.html')

def route(request, current_user):
    try:
        regular_user = current_user.regularaccount
        serialized_data = RegularSerialzer(regular_user).data
        return render(request, 'user/profile.html', {'user_info' : serialized_data})
        #return JsonResponse(serialized_data)
    except ObjectDoesNotExist:
        pass
    try:
        trainer_user = current_user.traineraccount
        serialized_data = TrainerSerialzer(trainer_user).data
        return render(request, 'user/profile.html', {'user_info' : serialized_data})
        #return JsonResponse(serialized_data)
    except ObjectDoesNotExist:
        pass

    return HttpResponse("Error Should Never Get Here")

def profile_page(request, id):
    current_user = request.user
    if current_user.is_authenticated() and (str(id) == str(current_user.id)):
        return route(request,current_user)
    return redirect('login')

def user_login(request):
    form = LoginForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        user = form.auth_form()
        if user:
            login(request, user)
            return HttpResponseRedirect(reverse('profile_page', args=(user.id,)))
    return render(request, 'user/login.html', {'form' : form})

def sign_up(request):
    form = SignUpForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        cd = form.clean()
        while True:
            hex_dig = hashlib.sha224(cd['email'].encode('utf-8') + cd['username'].encode('utf-8') + str(time.time()).encode('utf-8')).hexdigest()
            if not TrainerAccount.objects.filter(auth_token=hex_dig).exists() and not RegularAccount.objects.filter(auth_token=hex_dig).exists():
                break;

        user = User.objects.create_user(username=cd['username'],
                                        email=cd['email'],
                                        password=cd['password'],
                                        first_name=cd['first_name'],
                                        last_name=cd['last_name'])
        user.save()
        if cd['choice_field'] == '1':
            trainer = TrainerAccount.objects.create(user=user,auth_token=hex_dig)
            trainer.save();

        else:
            regular_user = RegularAccount.objects.create(user=user,auth_token=hex_dig)
            regular_user.save();

        user = form.auth_form()
        login(request, user)
        return HttpResponseRedirect(reverse('profile_page', args=(user.id,)))

    return render(request, 'user/sign_up.html', {'form' : form})

def logout_user(request):
    logout(request)
    return render(request, 'user/index.html')
