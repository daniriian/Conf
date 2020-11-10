from django import forms
from flatpickr import DatePickerInput, TimePickerInput, DateTimePickerInput
from .models import Todo
import datetime


class TodoForm(forms.ModelForm):

    class Meta:
        model = Todo
        today = datetime.date.today()
        fields = ['caller', 'start_time', 'end_time', 'call_to', 'data']
        widgets = {
            'start_time': TimePickerInput().start_of('todo active time'),
            'end_time': TimePickerInput().end_of('todo active time'),
            'call_to': forms.SelectMultiple(attrs={'class': 'multiple', "size": "8"}),
            'data': DatePickerInput(options={"dateFormat": "d/m/Y", "defaultDate": "today"}),
        }
