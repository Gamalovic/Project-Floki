from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseNotAllowed
from .models import Post 
from feeds.forms import PostForm
from events.models import Event


@login_required(login_url="multi/")
def feeds(request):
    events = Event.objects.all()
    posts = Post.objects.all()
  
    if request.method == 'POST':
        pform = PostForm(data=request.POST)
        if pform.is_valid():
            
            post = pform.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('/home')
        else:
            return HttpResponseNotAllowed(['get', 'post'])
        
    else:
        pform = PostForm()
       

        args = {'pform': pform, 'posts': posts, 'events': events}
        return render(request, "home.html", args)
