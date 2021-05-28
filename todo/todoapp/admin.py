from django.contrib import admin
from .models import Todo, SalaJudecata, Terminal, Instanta, TerminaleVC
from import_export.admin import ImportExportActionModelAdmin

# Register your models here.


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('caller', 'start_time', 'data')


@admin.register(SalaJudecata)
class SalaJudecataAdmin(admin.ModelAdmin):
    pass


@admin.register(Instanta)
class InstantaAdmin(admin.ModelAdmin):
    pass


@admin.register(Terminal)
class Terminal(ImportExportActionModelAdmin):
    list_display = ('beneficiar', 'nume_instanta', 'ip', 'vmr')
    search_fields=('nume_instanta', 'ip', 'vmr')
