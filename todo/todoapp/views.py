from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo, SalaJudecata, Terminal
from .forms import TodoForm
from django.contrib import messages
from datetime import datetime
from django.views import generic
from django.http import JsonResponse
# Create your views here.


def delete(request, todo_id):
    if request.user.is_authenticated:
        todo = Todo.objects.get(id=todo_id)
        todo.delete()
        messages.success(request, ('Videoconferinta a fost stearsa'))
    else:
        messages.error(
            request, ('Utilizator necunoscut, nu se pot sterge programari !!!'))
    return(redirect('filter_by_date'))


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


def edit(request, todo_id):

    if request.user.is_authenticated:
        instance = get_object_or_404(Todo, id=todo_id)
        if request.method == 'POST':
            todo = Todo.objects.get(id=todo_id)

            form = TodoForm(request.POST or None, instance=instance)
            if form.is_valid():
                form.save()
                messages.success(
                    request, ('Videoconferinta a fost modificata cu succes!'))
                return redirect('filter_by_date')
        else:
            todo = Todo.objects.get(id=todo_id)
            form = TodoForm(instance=instance)
            return render(request, 'todoapp/edit_conference.html', {'form': form, 'todo': todo})

    else:
        print('USER CAN NOT EDIT TODO')
        messages.error(
            request, ('Utilizator necunoscut, nu se pot modifica programari !!!'))
        return redirect('filter_by_date')


def showTodoDetail(request, todo_id):
    instance = get_object_or_404(Todo, todo_id)
    if request.method == 'GET':
        todo = Todo.objects.get(id=todo_id)
        return render(request, 'todoapp/conference_details.html', {'todo': todo})
    else:
        return redirect('filter_by_date')


def add_conference(request):

    if request.user.is_authenticated:
        print("USER IS AUTHENTICATED")

        if request.method == 'GET':
            form = TodoForm()
            return render(request, 'todoapp/add_conference.html', {'form': form})
        else:
            form = TodoForm(request.POST or None)
            if form.is_valid():
                startTime = form.cleaned_data.get('start_time')
                endTime = form.cleaned_data.get('end_time')
                current_data = form.cleaned_data.get('data')
                caller = form.cleaned_data.get('caller')
                apeleazaPe = form.cleaned_data.get('call_to')
                todos = Todo.objects.filter(data=current_data)

                err_message = ""

                for t in todos:
                    if (startTime >= t.start_time and startTime < t.end_time) or (endTime > t.start_time and endTime <= t.end_time):

                        if caller == t.caller:
                            print("Apelantul nu este liber in intervalul specificat")

                            err_message = 'Apelantul nu este liber in intervalul specificat !!!'
                        else:
                            for app in apeleazaPe:
                                if app in t.call_to.all():
                                    print(
                                        f"Destinatarul apelului nu este liber in intervalul specificat")
                                    err_message = 'Destinatarul apelului nu este liber in intervalul specificat !!!'

                if (err_message):
                    messages.error(request, err_message)
                    return redirect('filter_by_date')
                else:

                    instance = form.save(commit=False)
                    instance.adaugat_de = request.user
                    instance.save()
                    form.save_m2m()  # salveaza in db relatia many to many intre todo si call_to

                    # todos = Todo.objects.all()
                    messages.success(
                        request, ('Programarea a fost adaugata !'))
                    return redirect('filter_by_date')
    else:
        print('USER CAN NOT ADD TODO')
        messages.error(
            request, ('Utilizator necunoscut, nu se pot adauga programari !!!'))
        return redirect('filter_by_date')


def filter_by_date(request):

    xfrom = request.GET.get('xfrom')
    if (xfrom):
        todos = Todo.objects.filter(data=xfrom).order_by(
            'data', 'start_time', 'caller')
    else:
        todos = Todo.objects.all().order_by(
            'data', 'start_time', 'caller')

    context = {
        'todos': todos,

    }

    return render(request, "todoapp/home.html", context)
