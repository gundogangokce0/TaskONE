from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TeacherViewSet,
    SchoolClassViewSet,
    CourseViewSet,
    ClassroomViewSet,
    TimeSlotViewSet,
    CourseRequirementViewSet,
    ScheduleViewSet,
)

router = DefaultRouter()
router.register(r'teachers', TeacherViewSet, basename='teacher')
router.register(r'school-classes', SchoolClassViewSet, basename='schoolclass')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'classrooms', ClassroomViewSet, basename='classroom')
router.register(r'timeslots', TimeSlotViewSet, basename='timeslot')
router.register(r'course-requirements', CourseRequirementViewSet, basename='courserequirement')
router.register(r'schedules', ScheduleViewSet, basename='schedule')

urlpatterns = [
    path("", include(router.urls)),
]