# Generated by Django 2.0.4 on 2018-07-09 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('acc', '0006_auto_20180709_0136'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='year',
            field=models.IntegerField(blank=True, choices=[(1, 'First'), (2, 'Second'), (3, 'Third'), (4, 'Fourth')], null=True),
        ),
    ]
