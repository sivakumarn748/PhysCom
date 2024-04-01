from django.db import models
import uuid

# Create your models here.

class Room(models.Model) :
    roomID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)