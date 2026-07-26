
from .base_model import BaseModel
from django.db import models
from .helpers import DAYS_OF_WEEK


class Teacher(BaseModel):

    name = models.CharField(max_length=50,verbose_name='Teacher Name')
    off_day = models.CharField(max_length=10, choices= DAYS_OF_WEEK, verbose_name ='Off Day')

    def __str__(self):
        return self.name