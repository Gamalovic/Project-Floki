from django.shortcuts import render, HttpResponse, redirect, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.views import login
from acc.forms import regform
from rest_framework import generics
from rest_framework.permissions import AllowAny
from acc.serializers import UserCreateSerializer

from django.contrib.auth import get_user_model
#from acc.FinalFinalTest import AIML

#from acc.pyaiml3 import test

from acc.chatbotTensorFlow.chatbot import dialog
from acc.AIML.Floki import dialogAiml
from acc.AIML.NLP import Filtering
from schedule.views import scheduleResponse
from events.models import Event

from django.core.serializers import serialize
from schedule.models import Schedule
from schedule.serializers import ScheduleSerializer
import json

from .models import CustomUser

from django.http.response import HttpResponseNotAllowed
from django.urls import reverse_lazy
############## Restful API ###################
from rest_framework.views import APIView
from rest_framework import status


from rest_framework.response import Response
from acc.serializers import UserSerializer
from acc.serializers import UserLoginSerializer
#from acc.serializer import MsgSerializer



from django.contrib.auth.models import User

###################################################


from rest_framework import viewsets
##############################################


@login_required(login_url="login/")
def main(request):
    #main('hello')
    return render(request, "main.html", context=None)




def log(request):
    if request.method == 'POST':
        
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            return redirect('/')
    else:
        form = AuthenticationForm()
        args = {'form': form}
    return render(request, "login.html", args)


def reg(request):
    if request.method == 'POST':
        #form = UserCreationForm(request.POST)
        form = regform(request.POST)
        if form.is_valid():
            form.save()

            return redirect('/')

    else:
        #form = UserCreationForm
        form = regform
        args = {'form': form}
        return render(request, "reg.html", args)


################################ tgroba ########################################
################ ng7t :) ######################

def reglog(request):
    if request.method == 'POST':
        lform = AuthenticationForm(data=request.POST)
        if lform.is_valid():
            user = lform.get_user()
            login(request, user)
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            return redirect('/')
        else:
            return HttpResponseNotAllowed(['get', 'post'])
        rform = regform(request.POST)
        if rform.is_valid():
            rform.save()
            return redirect('/')
        else:
            return HttpResponseNotAllowed(['get', 'post'])

    else:
        lform = AuthenticationForm()
        rform = regform

        args = {'lform': lform, 'rform': rform}
        return render(request, "multi.html", args)



#################################### Message #############################################

class Msg(APIView):
    #serializer_class = MsgSerializer
   
    ## TensorFlow 
    ##def post(self, request):
    ##    message  = request.data['name']
        # serializer = UserLoginSerializer(data=data)
        # if serializer.is_valid(raise_exception=True):
        #     new_data = serializer.data
        #     print(new_data)

    ##    if request.method=='POST':
            #message_respond = dialog('hello')
    ##        res=dialog(message)
    ##        print(res)
    ##        return Response(res)
        #return Response(serializer.errors)



    ## AIML
    def post(self, request):
        message  = request.data['name']

        filtered_Message=Filtering(message)
        if(filtered_Message =="schedule"):
            queryset = Schedule.objects.all()
            ##user = get_user_model()
            ##y=user.year
            ##queryset = Schedule.objects.filter(subject_grade__in= str(y))
            r=serialize('json', queryset)
            jsonData=json.loads(r)
            response={"data":jsonData,"source":"db"}
            ##r= scheduleResponse()
            return Response(json.dumps(response))
            
        
        elif(filtered_Message=="event"):
            queryset = Event.objects.all()
            r = serialize('json', queryset)
            jsonData = json.loads(r)
            response={"data":jsonData,"source":"event"}
            return Response(json.dumps(response))
            

        else:
            if request.method=='POST':
            #message_respond = dialog('hello')
                res=dialogAiml(message)
                response={"data":res,"source":"AI"}
                return Response(json.dumps(response))
        # serializer = UserLoginSerializer(data=data)
        # if serializer.is_valid(raise_exception=True):
        #     new_data = serializer.data
        #     print(new_data)
    ##def scheduleResponse():
    ##    queryset = Schedule.objects.all()
    ##    serializer_class = ScheduleSerializer

        
    ##    return Response(serializer.errors)
################################### sign up API #######################################

class userCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserCreateSerializer
    queryset = CustomUser.objects.all()
    
    
    

################################### login API  ########################################


class userLoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        if request.method=='POST':
            data = request.data
            serializer = UserLoginSerializer(data=data)
            queryset = Event.objects.all()
            r = serialize('json', queryset)
            if serializer.is_valid(raise_exception=True):
                new_data = serializer.data
                print(new_data)            
            return Response(r)


class userView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


