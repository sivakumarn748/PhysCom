from django.db import models
from database.models import Person
from django.utils import timezone
import uuid

# Create your models here.

class Post(models.Model) :
    post_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    author = models.ForeignKey(Person, default=None, on_delete=models.CASCADE, related_name='post', null=False)
    text = models.BinaryField(blank=False)
    media = models.FileField(default=None, null=True, blank=True, upload_to='feeds/media/')
    media_name = models.CharField(max_length=255, null=True, blank=True, default=None)
    commented_to = models.ForeignKey('self', null=True, blank=True, default=None, on_delete=models.CASCADE, related_name='comments')
    postedAt = models.DateTimeField(default=timezone.now, null=False)
    likes = models.ManyToManyField(Person, default=None, through='Like', related_name='liked')

    def __str__(self):
        return f"{self.author} : {self.text[0:10]}..."

    @property
    def uuid(self) :
        return str(self.post_id)

    @property
    def mediaUUID(self) :
        if self.media :
            return str(self.media.name.split("/")[-1])
        else :
            return ""

    @property 
    def mediaURL(self) :
        if self.media :
            return f"/community/media/{self.mediaUUID}"
        else :
            return ""



class Like(models.Model) :
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(Person, on_delete=models.CASCADE)

    def __str__(self) :
        return f"{self.user} => {self.post}"