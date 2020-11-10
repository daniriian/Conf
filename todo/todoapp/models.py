from django.db import models


# Create your models here.


class SalaJudecata(models.Model):
    nr_sala = models.CharField(max_length=5, null=False)
    id_echipament = models.ForeignKey(
        'Terminal', on_delete=models.CASCADE)

    def __str__(self):
        return self.id_echipament.nume

    class Meta:
        verbose_name_plural = "Sali Judecata"


class Instanta(models.Model):
    id_Ecris = models.IntegerField(null=False, unique=True)
    nume = models.CharField(max_length=200, null=False)

    def __str__(self):
        return self.nume

    class Meta:
        verbose_name_plural = "Instante"


class TerminaleVC(models.Model):
    # todo_id = models.ForeignKey('Todo', on_delete=models.CASCADE, null=False)
    apeleaza_pe = models.ForeignKey(
        'Terminal', on_delete=models.CASCADE, null=False)
    prin_STS = models.BooleanField(default=False)

    def __str__(self):
        return self.apeleaza_pe.nume

    class Meta:
        verbose_name_plural = "Terminale Videoconferinta"


class Terminal(models.Model):
    nume = models.CharField(max_length=200, null=False)
    model = models.CharField(max_length=200, null=True)
    ip = models.CharField(max_length=200, null=False)
    nr_apel = models.CharField(max_length=200, null=False)

    def __str__(self):
        return self.nume

    class Meta:
        verbose_name_plural = "Terminale"


class Todo(models.Model):
    caller = models.ForeignKey(
        'SalaJudecata', on_delete=models.CASCADE, null=False)
    start_time = models.TimeField(
        auto_now=False, auto_now_add=False, blank=False)
    end_time = models.TimeField(
        auto_now=False, auto_now_add=False, blank=True)
    data = models.DateField(
        auto_now=False, auto_now_add=False, blank=False, null=False)
    call_to = models.ManyToManyField(Terminal)
    completed = models.BooleanField(default=False)
    adaugat_de = models.ForeignKey(
        'users.MyUser', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.caller.nr_sala

    def clean_rowname(self):
        return self.cleaned_data['end_time']

    class Meta:
        verbose_name_plural = "Programari videoconferinte"
