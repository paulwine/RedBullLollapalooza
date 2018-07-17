# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    wristband = models.BooleanField()
    phone = models.CharField(max_length=255)
    invitation = models.CharField(max_length=255,null=True, blank=True)
    affiliation = models.CharField(max_length=255,null=True, blank=True)
    referall = models.CharField(max_length=255,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
       return self.first_name + " " + self.last_name

# Create your models here.
