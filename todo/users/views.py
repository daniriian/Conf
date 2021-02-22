
from .models import MyUser
from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import (
    authenticate,
    logout,
    login
)
from django.shortcuts import (
    render,
    get_object_or_404,
    redirect
)
from .forms import (
    RegistrationForm,
    AccountAuthenticationForm,
    AccountUpdateform
)


def home(request):
    """
      Home View Renders base.html
    """
    return render(request, "base.html", {})


def registration_view(request):
    """
      Renders Registration Form 
    """
    context = {}
    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_pass = form.cleaned_data.get('password1')
            account = authenticate(email=email, password=raw_pass)
            login(request, account)
            messages.success(
                request, "You have been Registered as {}".format(request.user.username))
            return redirect('home')
        else:
            messages.error(request, "Please Correct Below Errors")
            context['registration_form'] = form
    else:
        form = RegistrationForm()
        context['registration_form'] = form
    return render(request, "users/register.html", context)


def logout_view(request):
    logout(request)
    messages.success(request, "Logged Out")
    return redirect("home")


def login_view(request):
    """
      Renders Login Form
    """
    context = {}
    user = request.user

    if user.is_authenticated:
        return redirect("home")
    if request.POST:
        form = AccountAuthenticationForm(request.POST)
        utilizator = request.POST.get('utilizator')
        password = request.POST.get('password')
        instanta = request.POST.get('instanta')
        user = authenticate(utilizator=utilizator,
                            password=password, instanta=instanta)

        # if user == (-1):
        #     messages.error(request, "Eroare la conectarea bazei de date")
        #     return redirect("/")
        if user:
            login(request, user)
            messages.success(request, "V-ati autentificat cu succes")
            return redirect("/videoconferinte")
        else:
            messages.error(request, "Corectati erorile de mai jos")
    else:
        form = AccountAuthenticationForm()
    context['login_form'] = form
    return render(request, "users/login.html", context)


def account_view(request):
    """
      Renders userprofile page "
    """
    if not request.user.is_authenticated:
        return redirect("login")
    context = {}
    if request.POST:
        form = AccountUpdateform(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "profile Updated")
        else:
            messages.error(request, "Please Correct Below Errors")
    else:
        form = AccountUpdateform(
            initial={
                'email': request.user.email,
                'username': request.user.username,
            }
        )
    context['account_form'] = form

    return render(request, "users/userprofile.html", context)
