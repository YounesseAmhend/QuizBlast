# Generated by Django 4.1 on 2023-05-20 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_question_information_alter_question_timer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='timer',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
