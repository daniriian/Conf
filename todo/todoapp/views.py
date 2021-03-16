from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo, SalaJudecata, Terminal
from .forms import TodoForm
from django.contrib import messages
from datetime import datetime
from django.views import generic
from django.http import JsonResponse, HttpResponse
from .serializers import TodoSerializer, TodoCreateSerializer, SalaJudecataSerializer, TerminalSerializer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from rest_framework import filters

import datetime
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
                return ({"status": False, "message": "Apelantul nu este liber in intervalul specificat"})

            else:
                dest = todo.call_to.all()

                if currentTodo['call_to'][0] in dest:
                    print(
                        'Unul dintre destinari este ocupat in perioada specificata')
                    return ({"status": False, "message": str(currentTodo['call_to'][0]) + " este deja ocupat in perioada selectata ..."})
    return ({"status": True, "message": "All OK"})


@api_view(['POST'])
@permission_classes([AllowAny])
def TodoCreateView(request, *args, **kwargs):
    print(f'*************************************************  {request.data}')
    serializer = TodoCreateSerializer(data=request.data)
    todayTodos = Todo.objects.filter(data=request.data['data'])
    if serializer.is_valid():
        result = isFree(serializer.validated_data, todayTodos)
        if result['status']:
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            message = result['message']
            return Response(message, status=400)
    return Response(serializer.errors, status=400)


@ api_view(['GET'])
def todoListView(request, *args, **kwargs):
    qs = Todo.objects.all().order_by('data', 'start_time', 'caller')

    selectedDate = request.GET.get('data', '')
    if selectedDate:
        qs = qs.filter(data=selectedDate)
    else:
        print("Nu avem acest parametru")

    serializer = TodoSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@ api_view(['GET'])
def callersView(request, *args, **kwargs):

    qs = SalaJudecata.objects.all()
    serializer = SalaJudecataSerializer(qs, many=True)

    return Response(serializer.data, status=200)


@ api_view(['GET'])
def terminalsView(request, *args, **kwargs):
    qs = Terminal.objects.all()

    serializer = TerminalSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@ api_view(['DELETE'])
@permission_classes([IsAdminUser])
def TodoDeleteView(request, *args, **kwargs):
    qs = Todo.objects.get(id=request.data["id"])
    qs.delete()
    return Response({}, status=200)


@ api_view(['GET', 'PUT'])
@permission_classes([IsAdminUser])
def todoDetailsView(request, todo_id, *args, **kwargs):
    qs = Todo.objects.get(id=todo_id)

    if request.method == 'GET':
        serializer = TodoSerializer(qs)
        return Response(serializer.data, status=200)

    elif request.method == 'PUT':
        todo_data = JSONParser().parse(request)
        serializer = TodoCreateSerializer(qs, data=todo_data)

        todayTodos = Todo.objects.filter(
            data=todo_data['data']).exclude(id=qs.id)
        if serializer.is_valid():

            result = isFree(serializer.validated_data, todayTodos)
            if result['status']:
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                message = result['message']
                return Response(message, status=400)
        return Response(serializer.errors, status=400)


# -------------------------------------------------------------------
@ api_view(['GET'])
@permission_classes([AllowAny])
def call_to_ip(request, *args, **kwargs):
    print("Asta e webscraperul")
    return Response({"Message": "Web Scraper"}, status=200)
