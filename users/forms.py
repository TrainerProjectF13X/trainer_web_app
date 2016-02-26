from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

class LoginForm(forms.Form):
    email = forms.CharField(max_length=256,required=True, error_messages={'required': 'Please enter your email'})
    password = forms.CharField(widget=forms.PasswordInput,required=True, error_messages={'required': 'Please enter your password'})

    def clean(self):
        email = self.cleaned_data.get('email')
        username = User.objects.filter(email=self.cleaned_data.get('email'))[0]
        user = User.objects.filter(email=email,username=username)[0]
        if not user:
            raise forms.ValidationError("Sorry, that user account does not exist.")
        if not user.is_active:
            raise forms.ValidationError("Sorry, that user account is not active.")
        return self.cleaned_data

    def auth_form(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        username = User.objects.filter(email=self.cleaned_data.get('email'))[0]
        user = authenticate(username=username, password=password)
        return user


class SignUpForm(forms.Form):
    email = forms.CharField(max_length=256,required=True, error_messages={'required': 'Please enter your email'})
    username= forms.CharField(max_length=30,required=True, error_messages={'required': 'Please enter a username'})
    first_name = forms.CharField(max_length=42,required=True, error_messages={'required': 'Please enter your last'})
    last_name = forms.CharField(max_length=42,required=True, error_messages={'required': 'Please your first name'})
    password = forms.CharField(widget=forms.PasswordInput,required=True, min_length=6, max_length=72,error_messages={'required': 'Please enter your password'})
    password_repeat = forms.CharField(widget=forms.PasswordInput,required=True, min_length=6, max_length=72,error_messages={'required': 'Please enter your password'})
    OPTIONS = (('1', 'Trainer',), ('2', 'Trainee/Personal',))
    choice_field = forms.ChoiceField(widget=forms.RadioSelect, choices=OPTIONS, required=True, error_messages={'required': 'Please select one of the choices'})

    def clean(self):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        password_repeat = self.cleaned_data.get('password_repeat')
        choice_field = self.cleaned_data.get('choice_field')
        last_name = self.cleaned_data.get('last_name')
        first_name = self.cleaned_data.get('first_name')
        if password != password_repeat:
            raise forms.ValidationError("Passwords do not match")
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email already used")
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("This username is already in use")
        return self.cleaned_data

    def auth_form(self):

        password = self.cleaned_data.get('password')
        username = User.objects.filter(email=self.cleaned_data.get('email'))[0]
        user = authenticate(username=username, password=password)
        return user
