"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from model.views import ProtectedView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("auth.urls")),
    path("api/protected/", ProtectedView.as_view(), name="protected"),
    path("api/teachers/", include("teacher.urls")),
    path("api/courses/", include("course.urls")),
    path("api/classrooms/", include("classroom.urls")),
    path("api/schoolclasses/", include("schoolclass.urls")),
    path("api/timeslots/", include("timeslot.urls")),
    path("api/course-requirements/", include("course_requirement.urls")),
    path("api/schedules/", include("schedule.urls")),
]