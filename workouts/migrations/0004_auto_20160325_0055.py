# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-25 00:55
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0003_auto_20160325_0054'),
    ]

    operations = [
        migrations.RenameField(
            model_name='savedactivity',
            old_name='name',
            new_name='activity_name',
        ),
    ]
