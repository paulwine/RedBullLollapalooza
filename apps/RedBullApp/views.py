# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from .models import User

# Create your views here.
def index(request):
    return render(request, "index.html")

def form_input(request):
    first_name = request.POST['first_name']
    last_name = request.POST['last_name']
    email = request.POST['email']
    invitation = ""
    if 'invitation' in request.POST:
        invitation = request.POST['invitation']
    wristband = False
    if 'yes' in request.POST:
        wristband = True
    print(wristband)
    User.objects.create(first_name=first_name, last_name=last_name, email=email, wristband=wristband, invitation=invitation)
    return redirect("/display_users")

def display_users(request):
    users = User.objects.filter(wristband=True)
    context = {
        'users' : users
    }
    return render(request, "display_users.html", context)
def waitlist(request):
    users = User.objects.filter(wristband=False)
    context = {
        'users' : users
    }
    return render(request, "waitlist.html", context)

def confirmation(request):
    return render(request, 'confirmation.html')