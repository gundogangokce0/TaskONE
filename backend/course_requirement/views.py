from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import CourseRequirement
from .serializers import CourseRequirementSerializer


class CourseRequirementViewSet(viewsets.ModelViewSet):
    queryset = CourseRequirement.objects.all()
    serializer_class = CourseRequirementSerializer
    permission_classes = [AllowAny]
