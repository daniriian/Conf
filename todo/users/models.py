from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.


class MyUserManager(BaseUserManager):
    def create_user(self, utilizator, nume, prenume, instanta, password=None):
        if not utilizator:
            raise ValueError('Trebuie introdus utilizatorul')
        if not nume:
            raise ValueError("Trebuie introdus numele")
        if not prenume:
            raise ValueError("Trebuie introdus prenumele")

        user = self.model(utilizator=utilizator, nume=nume,
                          prenume=prenume, instanta=instanta)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, utilizator, nume, prenume, password=None):
        user = self.create_user(utilizator, nume, prenume, password)
        user.is_admin = True
        user.save()
        return user


class MyUser(AbstractBaseUser):
    utilizator = models.CharField(max_length=50, unique=True)
    nume = models.CharField(max_length=50, null=False)
    prenume = models.CharField(max_length=50, null=False)
    telefon = models.CharField(max_length=10, null=True)
    instanta = models.ForeignKey(
        'todoapp.Instanta', to_field='id_Ecris', on_delete=models.CASCADE, null=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'utilizator'
    REQUIRED_FIELDS = ["nume", "prenume"]

    def __str__(self):
        return self.utilizator

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the `user` a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
