# Generated by Django 3.1.1 on 2020-10-06 06:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Instanta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_Ecris', models.IntegerField()),
                ('nume', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name_plural': 'Instante',
            },
        ),
        migrations.CreateModel(
            name='SalaJudecata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nr_sala', models.CharField(max_length=5)),
            ],
            options={
                'verbose_name_plural': 'Sali Judecata',
            },
        ),
        migrations.CreateModel(
            name='Terminal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nume', models.CharField(max_length=200)),
                ('model', models.CharField(max_length=200, null=True)),
                ('ip', models.CharField(max_length=200)),
                ('nr_apel', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name_plural': 'Terminale',
            },
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField(blank=True)),
                ('data', models.DateField()),
                ('completed', models.BooleanField(default=False)),
                ('call_to', models.ManyToManyField(to='todoapp.Terminal')),
                ('caller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todoapp.salajudecata')),
            ],
            options={
                'verbose_name_plural': 'Programari videoconferinte',
            },
        ),
        migrations.CreateModel(
            name='TerminaleVC',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prin_STS', models.BooleanField(default=False)),
                ('apeleaza_pe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todoapp.terminal')),
            ],
            options={
                'verbose_name_plural': 'Terminale Videoconferinta',
            },
        ),
        migrations.AddField(
            model_name='salajudecata',
            name='id_echipament',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todoapp.terminal'),
        ),
    ]
