from django.urls import path
from . import views

urlpatterns = [
    path("book/", view=views.bookRoom, name="bookRoom"),
    path("enter/<str:roomid>/", view=views.enterRoom, name="getRoom"),
    path("delete/<str:roomid", view=views.deleteRoom, name="deleteRoom"),
]
