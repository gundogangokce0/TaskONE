from django.contrib import admin
from .models import CourseRequirement


@admin.register(CourseRequirement)
class CourseRequirementAdmin(admin.ModelAdmin):
    list_display = ('id', 'school_class', 'course', 'teacher', 'weekly_hours')
    list_filter = ('school_class', 'course', 'teacher')
