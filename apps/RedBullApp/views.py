# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import threading
from django.shortcuts import render, redirect
from .models import User, EmailThread
from django.core.mail import send_mail, EmailMessage

from django.template.loader import render_to_string
from django.utils.html import strip_tags
 

# Create your views here.
def index(request):
    return render(request, "index.html")

def form_input(request):
    first_name = request.POST['first_name']
    last_name = request.POST['last_name']
    email = request.POST['email']
    phone = request.POST['phone']
    invitation = ""
    referall = ""
    affiliation = ""
    if 'invitation' in request.POST:
        invitation = request.POST['invitation']
    if 'referall' in request.POST:
        referall = request.POST['referall']
    if 'affiliation' in request.POST:
        affiliation = request.POST['affiliation']
    wristband = False
    html_content = render_to_string('waitlist_email.html')
    if 'yes' in request.POST:
        wristband = True
        message_html = render_to_string('email.html')
    print(wristband)
    User.objects.create(first_name=first_name, last_name=last_name, phone=phone,email=email, wristband=wristband, affiliation=affiliation, referall=referall,invitation=invitation)
    
    subject = 'Thank you for confirming! (Click to see invitation image)'
    recipient_list = [email]
    sender = 'industry@redbullcurateschi.com'
    EmailThread(subject, html_content, recipient_list, sender).start()
    # EmailThread(subject, html_content, recipient_list, sender).run()
#     send_mail(
#     'Thank you for confirming! (Click to see invitation image)',
#     'RedBull Curates Chi',
#     'industry@redbullcurateschi.com',
#     [email],
#     fail_silently=False,
#     html_message = message_html,
# )
    return redirect("/confirmation")

def display_users(request):
    if 'current_admin' not in request.session:
        return redirect("/")
    users = User.objects.filter(wristband=True)
    context = {
        'users' : users
    }
    return render(request, "display_users.html", context)
def display_users_filtered(request):
    if 'current_admin' not in request.session:
        return redirect("/")
    name_filter = ""
    invite_filter = ""
    users = User.objects.filter(wristband=True)
    if request.POST['last_name'] != "":
        name_filter = request.POST["last_name"]
        users = User.objects.filter(wristband=True, last_name=name_filter)
    if request.POST['invitation'] != "":
        invite_filter = request.POST["invitation"]
        users = User.objects.filter(wristband=True, invitation=invite_filter)
    if request.POST['invitation'] != "" and request.POST['last_name'] != "":
        name_filter = request.POST["last_name"]
        invite_filter = request.POST["invitation"]
        users = User.objects.filter(wristband=True, invitation=invite_filter, last_name=name_filter)
    context = {
        'users' : users
    }
    return render(request, "display_users.html", context)
def waitlist(request):
    if 'current_admin' not in request.session:
        return redirect("/")
    users = User.objects.filter(wristband=False)
    context = {
        'users' : users
    }
    return render(request, "waitlist.html", context)
def waitlist_filtered(request):
    if 'current_admin' not in request.session:
        return redirect("/")
    name_filter = ""
    invite_filter = ""
    users = User.objects.filter(wristband=False)
    if request.POST['last_name'] != "":
        name_filter = request.POST["last_name"]
        users = User.objects.filter(wristband=False, last_name=name_filter)
    if request.POST['invitation'] != "":
        invite_filter = request.POST["invitation"]
        users = User.objects.filter(wristband=False, invitation=invite_filter)
    if request.POST['invitation'] != "" and request.POST['last_name'] != "":
        name_filter = request.POST["last_name"]
        invite_filter = request.POST["invitation"]
        users = User.objects.filter(wristband=True, invitation=invite_filter, last_name=name_filter)
    users = User.objects.filter(wristband=False)
    context = {
        'users' : users
    }
    return render(request, "waitlist.html", context)

def confirmation(request):

    return render(request, 'confirmation.html')

def portal(request):
    return render(request, 'portal.html')

def portal_login(request):
    if request.method == 'GET':
        return redirect("/portal")
    if request.POST['username'] != 'RedBullAdmin' or request.POST['password'] != 'secretkey15':
        return redirect("/portal")
    request.session["current_admin"] = "MIKE JONES"
    return render(request, 'portal_login.html')