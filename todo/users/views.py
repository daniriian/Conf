import json
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


from rest_framework.decorators import api_view, renderer_classes

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


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@api_view(['POST'])
def login_view(request):
    """
      Renders Login Form
    """
    # context = {}

    if request.method == 'POST':
        # form = AccountAuthenticationForm(request.POST)
        utilizator = request.data['username']
        password = request.data['password']
        instanta = request.data['instanta']
        user = authenticate(utilizator=utilizator,
                            password=password, instanta=instanta)

        # if user == (-1):
        #     messages.error(request, "Eroare la conectarea bazei de date")
        #     return redirect("/")
        if user:
            login(request, user)
            return Response({'detail': 'Successfully logged in !!!'}, status=200)
        else:
            return JsonResponse({'detail': 'Invalid credentials'}, status=400)
    else:
        return Response({"details": "Nu este POST"})

# @require_POST
# def login_view(request):
#     data = json.loads(request.body)
#     username = data.get('username')
#     password = data.get('password')
#     instanta = data.get('instanta')

#     print("---------------- Inside login_view ---------------------------")
#     print(username, password, instanta)

#     instanta = 117

#     if username is None or password is None:
#         print("username or password is None")
#         return JsonResponse({'detail': 'Please provide username and password'}, status=400)

#     print("Launching authentication")
#     user = authenticate(username=username,
#                         password=password, instanta=instanta)

#     print(user)

#     if user is None:
#         return JsonResponse({'detail': 'Invalid credentials'}, status=400)

#     login(request, user)
#     return JsonResponse({'detail': 'Successfully logged in !!!'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


class SessionView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'isAuthenticated': True, 'username': request.user.utilizator})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return Response({'username': request.user.utilizator, 'id': request.user.id})

# def home(request):
#     """
#       Home View Renders base.html
#     """
#     return render(request, "base.html", {})


# def registration_view(request):
#     """
#       Renders Registration Form
#     """
#     context = {}
#     if request.POST:
#         form = RegistrationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             email = form.cleaned_data.get('email')
#             raw_pass = form.cleaned_data.get('password1')
#             account = authenticate(email=email, password=raw_pass)
#             login(request, account)
#             messages.success(
#                 request, "You have been Registered as {}".format(request.user.username))
#             return redirect('home')
#         else:
#             messages.error(request, "Please Correct Below Errors")
#             context['registration_form'] = form
#     else:
#         form = RegistrationForm()
#         context['registration_form'] = form
#     return render(request, "users/register.html", context)


# def logout_view(request):
#     logout(request)
#     messages.success(request, "Logged Out")
#     return redirect("home")


# def account_view(request):
#     """
#       Renders userprofile page "
#     """
#     if not request.user.is_authenticated:
#         return redirect("login")
#     context = {}
#     if request.POST:
#         form = AccountUpdateform(request.POST, instance=request.user)
#         if form.is_valid():
#             form.save()
#             messages.success(request, "profile Updated")
#         else:
#             messages.error(request, "Please Correct Below Errors")
#     else:
#         form = AccountUpdateform(
#             initial={
#                 'email': request.user.email,
#                 'username': request.user.username,
#             }
#         )
#     context['account_form'] = form

#     return render(request, "users/userprofile.html", context)
