from django.urls import path

from . import views

app_name = 'app'

urlpatterns = [
    path('home/', view=views.home, name='home'),
    path('signup/', view=views.signup, name='signup'),
    path('login/', view=views.login, name='login'),
    path('logout/', view=views.logout, name='logout'),
    path('settings/<str:sessID>/', view=views.settings, name='settings'),
    path('user/<str:userid>', view=views.bio, name='userinfo'),
    path('user/<str:userid>/<str:field>', view=views.activities, name='activities'),
]
