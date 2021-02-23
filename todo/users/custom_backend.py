from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
import hashlib
from .models import MyUser
from todoapp.models import Instanta
from django.contrib.auth import get_user_model


from django.db import connections

User = get_user_model()


def checkPassword(textPwd, dbPwd):
    """
    Check if entered password MD5 hash is the same as the hash from the database
    """
    hashPwd = hashlib.md5(textPwd.encode()).hexdigest().upper()
    if hashPwd == dbPwd:
        return True
    return False


class CustomBackend(BaseBackend):
    """
    Authenticate against the settings ADMIN_LOGIN and ADMIN_PASSWORD.

    Use the login name and a hash of the password. For example:

    ADMIN_LOGIN = 'gheorghe'
    ADMIN_PASSWORD = 'pbkdf2_sha256$30000$Vo0VlMnkR4Bk$qEvtdyZRWTcOsCnI/oQ7fVOu1XAURIZYoOZ3iq8Dr4M='
    """

    def authenticate(self, request, utilizator=None, password=None, instanta=None):

        if (instanta == None):
            # print(f'Instanta invalida----------------')
            return

        login_servers = {'117': 'usersTRCJ', '211': 'usersJCN',
                         '219': 'usersJD', '235': 'usersJG', '242': 'usersJH', '328': 'usersJT'}

        connect_server = login_servers.get(instanta)

        try:
            cursor = connections[connect_server].cursor()
        except:
            print("Connection error")
            return None

        cursor.execute(
            "SELECT * FROM dbo.personal where utilizator = %s", [utilizator])
        result = cursor.fetchone()
        nume_utilizator = result[4].lower()
        parola = result[5]
        utilizator = utilizator.lower()

        login_valid = (nume_utilizator == utilizator)
        pwd_valid = checkPassword(password, parola)

        if login_valid and pwd_valid:
            try:
                user = User.objects.get(utilizator=utilizator)
            except User.DoesNotExist:
                # Create a new user. There's no need to set a password
                # because only the password from settings.py is checked.
                user = User(utilizator=utilizator.lower(),
                            nume=result[1], prenume=result[2])
                # user.is_staff = True
                user.instanta = Instanta.objects.get(id_Ecris=instanta)
                user.is_admin = False
                user.save()
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
