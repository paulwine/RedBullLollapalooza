# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "index.html")

def form_input(request):
    return render(request, 'form_input.html')

def confirmation(request):
    return render(request, 'confirmation.html')