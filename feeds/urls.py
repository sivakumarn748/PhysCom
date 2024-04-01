from django.urls import path
from . import views

app_name='community'

urlpatterns = [
    path('feeds/', view=views.feed, name='feed'),
    path('post/<str:postid>/', view=views.post, name='post'),
    path('new-post/', view=views.newPost, name='newpost'),
    path('media/<str:filename>', view=views.media, name='media'),
]
