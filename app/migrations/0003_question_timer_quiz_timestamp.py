# Generated by Django 4.1 on 2023-05-20 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_question_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='timer',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='quiz',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
