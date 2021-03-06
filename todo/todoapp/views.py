from django.core import serializers
from rest_framework.views import APIView
from rest_framework import permissions

from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo, SalaJudecata, Terminal
from .forms import TodoForm
from django.contrib import messages
from datetime import datetime, date
from django.views import generic
from django.http import JsonResponse, HttpResponse
from .serializers import TodoSerializer, TodoCreateSerializer, SalaJudecataSerializer, TerminalSerializer, MyUserSerializer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from rest_framework import filters


# from urllib.request import urlopen

import socket
import sys
# Create your views here.


def convert_string_to_time(str):
    if len(str) <= 5:
        return datetime.time(hour=int(str[0:2]), minute=int(str[3:5]))
    else:
        return datetime.time(hour=int(str[0:2]), minute=int(str[3:5]), second=int(str[6:8]))


def mark_complete(request, todo_id):

    todo = Todo.objects.get(id=todo_id)
    todo.completed = True
    todo.save()
    return redirect('filter_by_date')


def mark_incomplete(request, todo_id):
    todo = Todo.objects.get(id=todo_id)
    todo.completed = False
    todo.save()
    return (redirect('filter_by_date'))


def detalii(request, todo_id):
    todo = Todo.objects.get(id=todo_id)

    context = {
        'todo': todo,
    }

    return render(request, "todoapp/detalii.html", context)


# def showTodoDetail(request, todo_id):
#     instance = get_object_or_404(Todo, todo_id)
#     if request.method == 'GET':
#         todo = Todo.objects.get(id=todo_id)
#         return render(request, 'todoapp/conference_details.html', {'todo': todo})
#     else:
#         return redirect('filter_by_date')


def isFree(currentTodo, todayTodos):
    # print('-----------------------------')
    # print(currentTodo['data'])
    # print('-----------------------------')
    # print(todayTodos)
    current_start_time = (currentTodo['start_time'])
    current_end_time = (currentTodo['end_time'])
    for todo in todayTodos:
        if (current_start_time >= todo.start_time and current_start_time < todo.end_time) or (current_end_time > todo.start_time and current_end_time <= todo.end_time):
            if (currentTodo['caller'].id == todo.caller.id):
                return ({"status": "error", "message": "Apelantul nu este liber in intervalul specificat"})

            else:
                dest = todo.call_to.all()

                if currentTodo['call_to'][0] in dest:
                    print(
                        'Unul dintre destinari este ocupat in perioada specificata')
                    return ({"status": "error", "message": str(currentTodo['call_to'][0]) + " este deja ocupat in perioada selectata ..."})
    return ({"status": "success", "message": "All OK"})


@method_decorator(csrf_protect, name='dispatch')
class AddVideoconferenceView(APIView):
    def post(self, request, format=None):

        data = self.request.data
        # print(data)
        try:
            serializer = TodoCreateSerializer(data=data)
            dailyVC = Todo.objects.filter(data=data['data'])

            if serializer.is_valid():
                result = isFree(serializer.validated_data, dailyVC)
                # print(serializer.data)

                if result["status"] == "success":
                    serializer.save()
                    return Response({"success": "Videoconferinta a fost adaugata cu succes", "vc": serializer.data})

                else:
                    return Response({"error": result['message']})
        except:
            return Response({"error": "A intervenit o eroare la adaugarea videoconferintei"})

@method_decorator(csrf_protect, name='dispatch')
class EditVideoconferenceView(APIView):
    def put(self, request, todo_id, format=None):
        data=request.data
        todo = Todo.objects.get(id=todo_id)

        serializer = TodoCreateSerializer(todo, data=data)

        if (serializer.is_valid()):
            serializer.save()
        else:
            return Response({"error": serializer.errors})
        
        # print(f'************************{todo}*************{data}**************************')
        return Response({"success": "Editata cu succes"})



class GetVCListView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        datax = self.request.data
        print(datax)
        
        try:
            qs = Todo.objects.filter(data=datax['data']).order_by(
                'data', 'start_time', 'caller')
            # print(type(datax['data']), type(str(date.today())))
            if (datax['data'] == str(date.today())):
               
                qs = qs.filter(end_time__gte=datetime.now().time().replace(microsecond=0))
                print(qs)
            else:
                print("FALSE")

            serializer = TodoSerializer(qs, many=True)
            return Response({"success": "Lista de videoconferinte a fost obtinuta cu succes", "vc_list": serializer.data})
        except:
            return Response({"error": "Eroare la obtinerea listei de videoconferinte"})


class CallersListView(APIView):
    def get(self, request, format="None"):

        try:
            qs = SalaJudecata.objects.all().order_by("id_echipament__nume_instanta")
            serializer = SalaJudecataSerializer(qs, many=True)
            print(serializer)
            return Response({"success": "Callers retrieved successfully", "callersList": serializer.data})
        except:
            return Response({"error": "Something went wrong while trying to get callers"})


class TerminalListView(APIView):
    def get(self, request, format=None):

        try:
            qs = Terminal.objects.all().order_by('nume_instanta')
            serializer = TerminalSerializer(qs, many=True)
            return Response({"success": "Terminals list retrieved successfully", "terminalsList": serializer.data})
        except:
            return Response({"error": "Something went wrong while trying to get terminals"})


@method_decorator(csrf_protect, name='dispatch')
class VideoDeleteView(APIView):
    def delete(self, request, todo_id, format=None):
        user_id = self.request.user.id
        data = self.request.data
        print(todo_id)

        try:
            qs = Todo.objects.get(id=todo_id)
            serializer = TodoSerializer(qs)
            userSerializer = MyUserSerializer(serializer.data['adaugat_de'])
            if user_id == userSerializer.data['id']:
                qs.delete()
                return Response({"success": "Videoconferinta a fost stearsa cu succes"})
            else:
                return Response({"error": "Nu puteti sterge videoconferinta adaugata de alta persoana"})
        except:
            return Response({"error": "Eroare grava la stergerea videoconferintei"})


class VideoDetailsView(APIView):
    def get(self, request, todo_id, format=None):
        try:
            qs = Todo.objects.get(id=todo_id)
            serializer = TodoSerializer(qs)
            return Response({"success": "Detaliile videoconferintei s-au obtinut cu succes", "videoconferinta": serializer.data})
        except:
            return Response({"error": "Eroare grava la obtinerea detaliilor videoconferintei"})

    def put(self, request, todo_id, format=None):
        user_id = self.request.user.id

        try:
            qs = Todo.objects.get(id=todo_id)

            serializer = TodoSerializer(qs)

            adaugat_de = serializer.data['adaugat_de']['id']

            if user_id == adaugat_de:

                incoming_data = JSONParser().parse(request)

                serializer = TodoCreateSerializer(qs, data=incoming_data)
                if serializer.is_valid():
                    todos_of_day = Todo.objects.filter(
                        data=incoming_data['data']).exclude(id=qs.id)
                    result = isFree(serializer.validated_data, todos_of_day)

                    if result["status"] == "success":
                        serializer.save()
                        return Response({"success": "Videoconferinta a fost modificata cu succes", "videoconferinta": serializer.data})
                    else:
                        return Response({"error": result['message']})
                return Response({"error": serializer.errors})
        except:
            return Response({"error": "Eroare grava la modificarea videoconferintei"})


# -------------------------------------------------------------------
@method_decorator(csrf_protect, name='dispatch')
class CallToIpView(APIView):
    def post(self, request, format=None):
        data = self.request.data

        apelant = data['apelant']
        destinatar = data['destinatar']
        action = data['action']

        MESSAGE = ""

        if (action) == "dial":
            MESSAGE = "dial auto " + destinatar + "\r\n"
        elif (action == "hang-up"):
            MESSAGE = "button hangup\r\n"

        HOST = apelant
        PORT = 6024

        print('*******************************************')
        print(apelant)
       # Create a TCP/IP socket
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # MESSAGE = "dial auto " + destinatar + "\r\n"
        # print(f'Calling {destinatar}')
        # Connect the socket to the port where the server is listening
        s.connect((HOST, PORT))
        s.send(MESSAGE.encode())
        print(MESSAGE)

        return Response({"Message": "All OK"}, status=200)
