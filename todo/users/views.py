import json
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response


from rest_framework.decorators import api_view, renderer_classes, permission_classes

from .models import MyUser
from todoapp.serializers import MyUserSerializer

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
@permission_classes([AllowAny])
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
            userDetails = MyUser.objects.get(utilizator=user.utilizator)
            serializer = MyUserSerializer(userDetails)
            return Response(serializer.data, status=200)
        else:
            return JsonResponse({'detail': 'Invalid credentials'}, status=400)
    else:
        return Response({"details": "Nu este POST"})


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
        serializer = MyUserSerializer(request.user)
        print(serializer)
        return Response(serializer.data)



class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return Response({'username': request.user.utilizator, 'id': request.user.id})
