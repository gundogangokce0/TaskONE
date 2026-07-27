from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseRequirementViewSet

router = DefaultRouter()
router.register(r'', CourseRequirementViewSet, basename='course_requirement')

urlpatterns = [
    path('', include(router.urls)),
]
