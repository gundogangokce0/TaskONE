from django.contrib import admin
from .models import Classroom


@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_lab')
    list_filter = ('is_lab',)
    search_fields = ('name',)
