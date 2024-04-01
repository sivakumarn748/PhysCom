from django.shortcuts import render
from django.http import HttpResponse, FileResponse, HttpResponseRedirect
from django.urls import reverse
from django.core.files.base import ContentFile
from database.models import Person
from feeds.models import Post
import humanize
import uuid

# Create your views here.

def feed(request) :
    if request.method == 'GET' :
        posts = Post.objects.all()
        posts = posts.order_by('-postedAt')
        UUIDs = [str(post.post_id) for post in posts]
        return render(request, 'feed.html', {
            'UUIDs' : UUIDs
        })

    if request.method == 'POST' :
        posts = Post.objects.all()
        posts = posts.order_by('-postedAt')
        UUIDs = [str(post.post_id) for post in posts]
        return render(request, 'feed.html', {
            'UUIDs' : UUIDs
        })

def post(request, postid) :
    if request.method == 'GET' :
        post = Post.objects.get(post_id=postid)
        isliked = False
        try :
            sessID = request.GET['sessID'] 
            try :
                if sessID :
                    user = Person.objects.get(sessionID=sessID)
                    isliked = post.likes.contains(user)
                else :
                    isliked = False
            except Person.DoesNotExist :
                return HttpResponse('Try Login Again')
        except :
            pass

        return render(request, 'post.html', {
            'author': post.author,
            'post': post,
            'naturaltime': str(humanize.naturaltime(post.postedAt)),
            'isliked': isliked,
            'likescount': str(post.likes.all().count()),
            'commentscount': str(post.comments.all().count()),
            'comments': post.comments.all()
        })


def newPost(request) :
    if request.method == 'POST' :
        sessID = request.POST['sessID']
        text = request.POST['text']
        comment = False

        try :
            person = Person.objects.get(sessionID=sessID)
            post = Post()
            post.text = text.encode(encoding='utf-8')
            post.author = person
            try :
                post.commented_to = Post.objects.get(post_id=request.POST['commented_to'])
                comment = True
            except : 
                pass

            if request.FILES :
                file = request.FILES['media']
                post.media_name = file.name
                extension = file.name.split(".")[1]
                post.media.save(f"{uuid.uuid4()}.{extension}", ContentFile(file.read()))

            post.save()

        except Person.DoesNotExist :
            return HttpResponse("Try Re-login")

        if not comment :
            return HttpResponseRedirect(reverse('community:feed'))
        else :
            return HttpResponseRedirect(reverse('community:post', kwargs={'postid':request.POST['commented_to']}))

def media(request, filename) :
    if request.method == "GET" :
        try : 
            return FileResponse(open(f"feeds/media/{filename}", "rb"), as_attachment=False, filename=filename)
        except :
            return HttpResponse(f"Cannot get file {filename}")