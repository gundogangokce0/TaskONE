from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_lab_required')
    list_filter = ('is_lab_required',)
    search_fields = ('name',)
