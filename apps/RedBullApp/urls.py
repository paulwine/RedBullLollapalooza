from django.conf.urls import url
from . import views 

urlpatterns = [
    url(r'^$', views.index),
    url(r'^form_input$', views.form_input),
    url(r'^confirmation$', views.confirmation),
]