# Generated by Django 3.1.1 on 2020-10-26 10:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0003_auto_20201026_1235'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='instanta',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='todoapp.instanta', to_field='id_Ecris'),
        ),
    ]
