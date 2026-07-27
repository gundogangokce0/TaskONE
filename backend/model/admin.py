from django.contrib import admin
from .teacher import Teacher
from .schoolclass import SchoolClass
from .course import Course
from .classroom import Classroom
from .timeslot import TimeSlot
from .courserequirement import CourseRequirement
from .schedule import Schedule


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'off_day')
    search_fields = ('name',)


@admin.register(SchoolClass)
class SchoolClassAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_lab_required')
    list_filter = ('is_lab_required',)
    search_fields = ('name',)


@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_lab')
    list_filter = ('is_lab',)
    search_fields = ('name',)


@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'day', 'hour')
    list_filter = ('day',)


@admin.register(CourseRequirement)
class CourseRequirementAdmin(admin.ModelAdmin):
    list_display = ('id', 'school_class', 'course', 'teacher', 'weekly_hours')
    list_filter = ('school_class', 'course', 'teacher')


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'school_class', 'course', 'teacher', 'classroom', 'time_slot')
    list_filter = ('school_class', 'teacher', 'classroom', 'time_slot')
