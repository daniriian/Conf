from rest_framework import serializers
from .models import Todo, Terminal, SalaJudecata, Instanta
from users.models import MyUser


class TodoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'caller', 'start_time', 'end_time',
                  'data', 'call_to', 'completed', 'adaugat_de']

    def validate(self, value):
        print(value)
        return value


class TerminalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Terminal
        fields = '__all__'


class SalaJudecataSerializer(serializers.ModelSerializer):

    id_echipament = TerminalSerializer(read_only=True)

    class Meta:
        model = SalaJudecata
        fields = ['id', 'nr_sala', 'id_echipament']


class InstantaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instanta
        fields = ['id_Ecris', 'nume']


class MyUserSerializer(serializers.ModelSerializer):

    instanta = InstantaSerializer(read_only=True)

    class Meta:
        model = MyUser
        fields = ['id', 'utilizator', 'nume', 'prenume', 'telefon', 'instanta']


class TodoSerializer(serializers.ModelSerializer):
    caller = SalaJudecataSerializer(read_only=True)
    call_to = TerminalSerializer(read_only=True, many=True)
    adaugat_de = MyUserSerializer(read_only=True)

    class Meta:
        model = Todo
        fields = ['id', 'caller', 'start_time', 'end_time',
                  'data', 'call_to', 'completed', 'adaugat_de']

    def get_call_to(self, obj):
        return obj.call_to.all()
