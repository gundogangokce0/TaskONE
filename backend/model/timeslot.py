from .base_model import BaseModel
from django.db import models
from .helpers import DAYS_OF_WEEK

class TimeSlot(BaseModel):

    day =models.CharField(max_length = 10, choices = DAYS_OF_WEEK, verbose_name = 'Day of the Week')
    hour = models.IntegerField(verbose_name='Hours of the Day')

    class Meta:
        unique_together = ('day', 'hour')

    def __str__(self):
        return f"{self.get_day_display()} - {self.hour}"