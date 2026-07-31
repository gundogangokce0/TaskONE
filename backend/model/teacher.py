
from .base_model import BaseModel
from django.db import models
from .helpers import DAYS_OF_WEEK


TITLE_CHOICES = (
    ('Prof. Dr.', 'Prof. Dr.'),
    ('Doç. Dr.', 'Doç. Dr.'),
    ('Dr. Öğr. Üyesi', 'Dr. Öğr. Üyesi'),
    ('Öğr. Gör.', 'Öğr. Gör.'),
    ('Arş. Gör.', 'Arş. Gör.'),
)


class Teacher(BaseModel):
    name = models.CharField(max_length=100, verbose_name='Teacher Name')
    title = models.CharField(max_length=50, choices=TITLE_CHOICES, default='Prof. Dr.', verbose_name='Title', blank=True, null=True)
    email = models.EmailField(verbose_name='Email Address', blank=True, null=True)
    phone = models.CharField(max_length=20, verbose_name='Phone Number', blank=True, null=True)
    department = models.CharField(max_length=100, verbose_name='Department / Branch', blank=True, null=True)
    office_number = models.CharField(max_length=30, verbose_name='Office Room Number', blank=True, null=True)
    off_day = models.CharField(max_length=10, choices=DAYS_OF_WEEK, default='Monday', verbose_name='Off Day')
    max_daily_hours = models.IntegerField(default=6, verbose_name='Max Daily Teaching Hours')

    def __str__(self):
        return f"{self.title or ''} {self.name}".strip()