from django.shortcuts import render, redirect
from django.http.response import HttpResponseNotAllowed, HttpResponseRedirect
from .models import Event
from events.forms import EventForm


def events(request):
    events = Event.objects.all()
    args = {'events': events}
    return render(request, "eventPage.html", args)


def createEvent(request):
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('/events')
        else:
            return render(request, 'newEvent.html', {'form': form})

    else:
        form = EventForm()
        args = {'form': form}
        return render(request, "newEvent.html", args)
