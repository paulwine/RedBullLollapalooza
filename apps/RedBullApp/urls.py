from django.conf.urls import url
from . import views 

urlpatterns = [
    url(r'^$', views.index),
    url(r'^form_input$', views.form_input),
    url(r'^confirmation$', views.confirmation),
    url(r'^display_users$', views.display_users),
    url(r'^waitlist$', views.waitlist),
    url(r'^display_users_filtered$', views.display_users_filtered),
    url(r'^waitlist_filtered$', views.waitlist_filtered),
    url(r'^portal$', views.portal),
    url(r'^portal_login$', views.portal_login),
    url(r'^send_mail_to_all_users$', views.send_mail_to_all_users)

]