from django import forms
from .models import MyUser
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm


class RegistrationForm(UserCreationForm):
    """
      Form for Registering new users 
    """
    utilizator = forms.TextInput()

    class Meta:
        model = MyUser
        fields = ('utilizator', 'nume', 'prenume',)

    def __init__(self, *args, **kwargs):
        """
          specifying styles to fields 
        """
        super(RegistrationForm, self).__init__(*args, **kwargs)
        for field in (self.fields['utilizator'], self.fields['password1'], self.fields['password2']):
            field.widget.attrs.update({'class': 'form-control '})


class AccountAuthenticationForm(forms.ModelForm):
    """
      Form for Logging in  users
    """
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = MyUser
        fields = ('utilizator', 'password', 'instanta')
        widgets = {
            'utilizator': forms.TextInput(attrs={'class': 'form-control'}),
            'password': forms.TextInput(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        """
          specifying styles to fields 
        """
        super(AccountAuthenticationForm, self).__init__(*args, **kwargs)
        for field in (self.fields['utilizator'], self.fields['password'], self.fields['instanta']):
            field.widget.attrs.update({'class': 'form-control '})

    def clean(self):
        if self.is_valid():

            utilizator = self.cleaned_data.get('utilizator')
            password = self.cleaned_data.get('password')
            if not authenticate(utilizator=utilizator, password=password):
                raise forms.ValidationError('Invalid Login')


class AccountUpdateform(forms.ModelForm):
    """
      Updating User Info
    """
    class Meta:
        model = MyUser
        fields = ('utilizator', 'nume', 'prenume')
        widgets = {
            'utilizator': forms.TextInput(attrs={'class': 'form-control'}),
            'password': forms.TextInput(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        """
          specifying styles to fields 
        """
        super(AccountUpdateform, self).__init__(*args, **kwargs)
        for field in (self.fields['utilizator'], self.fields['nume'], self.fields['prenume']):
            field.widget.attrs.update({'class': 'form-control '})

    def clean_email(self):
        if self.is_valid():
            utilizator = self.cleaned_data['utilizator']
            try:
                account = MyUser.objects.exclude(
                    pk=self.instance.pk).get(utilizator=utilizator)
            except MyUser.DoesNotExist:
                return utilizator
            raise forms.ValidationError('Utilizatorul exista deja')

    def clean_username(self):
        if self.is_valid():
            utilizator = self.cleaned_data['utilizator']
            try:
                account = MyUser.objects.exclude(
                    pk=self.instance.pk).get(utilizator=utilizator)
            except Account.DoesNotExist:
                return utilizator
            raise forms.ValidationError("Utilizatorul exista deja")
