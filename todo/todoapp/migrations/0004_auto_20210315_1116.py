# Generated by Django 3.1.3 on 2021-03-15 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0003_auto_20201026_1235'),
    ]

    operations = [
        migrations.RenameField(
            model_name='terminal',
            old_name='nr_apel',
            new_name='beneficiar',
        ),
        migrations.RenameField(
            model_name='terminal',
            old_name='nume',
            new_name='nume_instanta',
        ),
        migrations.RemoveField(
            model_name='terminal',
            name='model',
        ),
        migrations.AddField(
            model_name='terminal',
            name='vmr',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]
