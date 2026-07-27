from django.contrib import admin
from .models import Schedule


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'school_class', 'course', 'teacher', 'classroom', 'time_slot')
    list_filter = ('school_class', 'teacher', 'classroom', 'time_slot')
