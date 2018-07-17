# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from .models import User
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


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
    message_html = render_to_string('waitlist_email.html')
    if 'yes' in request.POST:
        wristband = True
        message_html = render_to_string('email.html')
    print(wristband)
    User.objects.create(first_name=first_name, last_name=last_name, email=email, wristband=wristband, invitation=invitation)
    
    
    send_mail(
    'Thank you for partying with us!',
    'RedBull',
    'RedBullVillaRiad@gmail.com',
    [email],
    fail_silently=False,
    html_message = message_html,
)
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