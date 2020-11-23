from rest_framework import serializers
from .models import Todo, Terminal


class TodoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'caller', 'start_time', 'end_time',
                  'data', 'call_to', 'completed', 'adaugat_de']

    def validate(self, value):
        print(value)
        return value


class TerminalSerializer(serializers.ModelSerializer):
    terminalName = serializers.CharField(many=True)

    class Meta:
        model = Terminal
        fields = ['nume']


class TodoSerializer(serializers.ModelSerializer):
    call_to = serializers.TerminalSerializer(many=True, read_only=True)

    class Meta:
        model = Todo
        fields = ['id', 'caller', 'start_time', 'end_time',
                  'data', 'call_to', 'completed', 'adaugat_de']

    def get_call_to(self, obj):
        return obj.call_to.all()
