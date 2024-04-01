from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from database.models import Person
from django.core.files.base import ContentFile
import uuid

# Create your views here.

def home(request) :
    pass

def signup(request) :
    if request.method == 'POST' :
        form = request.POST
        
        # if Person.objects.all().contains(Person(userid=form['userid'])) :
        if Person.objects.filter(userid__iexact=form['userid']) :
            return HttpResponse(f"Userid {form['userid']} already exists. Try another userid.")

        person = Person(
            name=form['name'],
            userid=form['userid'],
            password=form['password'],
            email=form['email'],
            phone=form['phone'],
            about=form['bio'],
            dob=form['dob'],
            question=form['question'],
            answer=form['answer']
        )
        person.save()
        if request.FILES :
            person.profile.save(form['userid']+'.jpg', ContentFile(request.FILES['profile'].read()))
            person.save()
        return HttpResponse("Created User @"+form['userid'])

    return render(request, 'signup.html')

def login(request) :
    if request.method == 'GET' :
        try: 
            next = request.GET['next']
        except :
            next = None
        return render(request, 'login.html', {
            'next': next,
        })
    
    if request.method == 'POST' :
        userid = request.POST['userid']
        password = request.POST['password']
        try :
            user = Person.objects.filter(userid__iexact=userid)[0]
            if password == user.password :
                sessID = uuid.uuid4()
                user.sessionID = sessID
                user.save()
                try:
                    next = request.POST['next'] 
                    return HttpResponse(f"<!DOCTYPE HTML><html><head><title>Success</title></head><body><script>localStorage.setItem('physcomsessID', '{sessID}');localStorage.setItem('userid', '{userid}');window.location.href='{next}';</script>Login successful</body></html>")
                except :
                    return HttpResponse(f"<!DOCTYPE HTML><html><head><title>Success</title></head><body><script>localStorage.setItem('physcomsessID', '{sessID}');localStorage.setItem('userid', '{userid}');window.location.href='/community/feeds';</script>Login successful</body></html>")
                # return HttpResponse(f"<!DOCTYPE HTML><html><head><title>Success</title></head><body><script>localStorage.setItem('physcomsessID', '{sessID}');localStorage.setItem('userid', '{userid}');window.location.href=;</script>Login successful</body></html>")
            else :
                return HttpResponse('<center><h1 style="font-family:monospace;color:red;">Invalid Password</h1></center>')

        except Person.DoesNotExist :
            return HttpResponse('<center><h1 style="font-family:monospace;color:red;">UserID doesnot exists</h1></center>')

def settings(request, sessID) :
    if request.method == "GET" :
        person = Person.objects.get(sessionID = sessID)
        return render(request, 'settings.html', {
            'person': person
        })

def bio(request, userid)  :
    if request.method == "GET"  :
        try :
            user = Person.objects.filter(userid__iexact=userid)
            if user :
                user = user[0]
                return render(request, "bio.html", {
                    'user': user,
                    'NoOfPost': user.post.count(),
                    'NoOfReplies': user.post.exclude(commented_to=None).count(),
                    'NoOfMedia': user.post.filter(media__isnull=False).count(),
                    'NoOfLikes': user.liked.count(),
                })
            else :
                return HttpResponse("User Not found")
        except Person.DoesNotExist :
            return HttpResponse("User Not found")

def activities(request, userid, field) :
    return render(request, 'activities.html', {
        'field': field,
    })

def logout(request) :
    return HttpResponse(f"<!DOCTYPE HTML><html><head><title>Success</title></head><body><script>localStorage.removeItem('physcomsessID');localStorage.removeItem('userid');window.location.href='/community/feeds';</script>Login successful</body></html>")

