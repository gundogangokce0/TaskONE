from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import SchoolClass
from .serializers import SchoolClassSerializer


class SchoolClassViewSet(viewsets.ModelViewSet):
    queryset = SchoolClass.objects.all()
    serializer_class = SchoolClassSerializer
    permission_classes = [AllowAny]
