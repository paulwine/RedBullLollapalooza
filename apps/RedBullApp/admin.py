# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    pass
    readonly_fields = ('created_at',)
    list_display = ['first_name', 'last_name', 'email', 'created_at', 'id']
    list_filter = ['last_name', 'email', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'created_at', 'id']
    class Meta:
        model = User
admin.site.register(User, UserAdmin)

# Register your models here.
