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

from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
# Create your views here.


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


def showTodoDetail(request, todo_id):
    instance = get_object_or_404(Todo, todo_id)
    if request.method == 'GET':
        todo = Todo.objects.get(id=todo_id)
        return render(request, 'todoapp/conference_details.html', {'todo': todo})
    else:
        return redirect('filter_by_date')


@api_view(['POST'])
def TodoCreateView(request, *args, **kwargs):
    serializer = TodoCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def todoListView(request, *args, **kwargs):

    qs = Todo.objects.all().order_by('data', 'start_time', 'caller')
    serializer = TodoSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def callersView(request, *args, **kwargs):
    qs = SalaJudecata.objects.all()
    serializer = SalaJudecataSerializer(qs, many=True)

    return Response(serializer.data, status=200)


@api_view(['GET'])
def terminalsView(request, *args, **kwargs):
    qs = Terminal.objects.all()

    serializer = TerminalSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['DELETE'])
def TodoDeleteView(request, *args, **kwargs):

    qs = Todo.objects.get(id=request.data["id"])
    qs.delete()
    return Response({}, status=200)


@api_view(['GET', 'PUT'])
def todoDetailsView(request, todo_id, *args, **kwargs):
    qs = Todo.objects.get(id=todo_id)

    if request.method == 'GET':
        serializer = TodoSerializer(qs)
        return Response(serializer.data, status=200)

    elif request.method == 'PUT':
        todo_data = JSONParser().parse(request)

        serializer = TodoCreateSerializer(qs, data=todo_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
