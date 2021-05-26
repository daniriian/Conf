from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import permissions


from rest_framework.decorators import permission_classes

from .models import MyUser
from todoapp.serializers import MyUserSerializer

from django.contrib.auth import (
    authenticate,
    logout,
    login
)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class getCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'csrf cookie set'})


class CheckAuthenticationView(APIView):
    def get(self, request, format=None):
        permission_classes = (permissions.AllowAny, )

        user = self.request.user
        # print("CheckAuthenticationView")
        # print(self.request.user.is_authenticated)
        try:
            isAuthenticated = user.is_authenticated

            if (isAuthenticated):
                return Response({"isAuthenticated": "success"})
            else:
                return Response({"isAuthenticated": "error"})
        except:
            return Response({"error": "Something went wrong when checking authentication status"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        utilizator = data['username']
        password = data['password']
        instanta = data['instanta']

        try:
            user = authenticate(utilizator=utilizator,
                                password=password, instanta=instanta)
            if user is not None:
                login(request, user)
                serializer = MyUserSerializer(user)
                return Response({"success": "User logged in successfully", "curentUser": serializer.data})
            else:
                return Response({"error": "Error logging in"})
        except:
            return Response({"error": "Something went wrong with logging in"})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            logout(request)
            return Response({"success": "Logged out"})
        except:
            return Response({"error": "Something went wrong with user logging out"})


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        users = MyUser.objects.all()

        serializer = MyUserSerializer(users, many=True)
        return Response(serializer.data)


class GetUserProfileView(APIView):
    def get(self, request, format=None):

        try:
            user = self.request.user
            currentUser = MyUser.objects.get(id=user.id)
            serializer = MyUserSerializer(currentUser)

            if serializer.data:
                # print("Successfully retrieved user details")
                # print(serializer.data)
                return Response({"success":"Successfully retrieved user details", "currentUser": serializer.data})
            else:
                 return Response({"Error":"Error while trying to get user details"})

        except:

            return Response({"Error":"Error while trying to get user details"})
            