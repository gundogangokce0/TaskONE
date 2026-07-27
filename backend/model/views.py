from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import json

from .teacher import Teacher
from .schoolclass import SchoolClass
from .course import Course
from .classroom import Classroom
from .timeslot import TimeSlot
from .courserequirement import CourseRequirement
from .schedule import Schedule
from .utils import generate_schedule

from .serializers import (
    TeacherSerializer,
    SchoolClassSerializer,
    CourseSerializer,
    ClassroomSerializer,
    TimeSlotSerializer,
    CourseRequirementSerializer,
    ScheduleSerializer,
)


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny]


class SchoolClassViewSet(viewsets.ModelViewSet):
    queryset = SchoolClass.objects.all()
    serializer_class = SchoolClassSerializer
    permission_classes = [AllowAny]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = [AllowAny]


class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
    permission_classes = [AllowAny]


class CourseRequirementViewSet(viewsets.ModelViewSet):
    queryset = CourseRequirement.objects.all()
    serializer_class = CourseRequirementSerializer
    permission_classes = [AllowAny]


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], url_path='generate')
    def generate(self, request):
        requirements = list(CourseRequirement.objects.all())
        classrooms = list(Classroom.objects.all())
        time_slots = list(TimeSlot.objects.all())

        if not requirements or not classrooms or not time_slots:
            return Response(
                {"error": "Requirements, classrooms, and time slots are required to generate a schedule."},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_schedule = generate_schedule(requirements, classrooms, time_slots)
        if new_schedule is None:
            return Response(
                {"error": "Could not generate a valid schedule with current constraints."},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        Schedule.objects.all().delete()
        saved_schedule = []
        for item in new_schedule:
            item.save()
            saved_schedule.append(item)

        serializer = self.get_serializer(saved_schedule, many=True)
        return Response({"message": "Schedule generated successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)


def login_user(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST method is allowed"},
            status=405,
        )

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON data"},
            status=400,
        )

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return JsonResponse(
            {"error": "Username and password are required"},
            status=400,
        )

    user = authenticate(
        username=username,
        password=password,
    )

    if user is None:
        return JsonResponse(
            {"error": "Invalid username or password"},
            status=401,
        )

    refresh = RefreshToken.for_user(user)

    return JsonResponse(
        {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        },
        status=200,
    )


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "message": "This area is protected.",
            "user_id": request.user.id,
            "username": request.user.username
        })