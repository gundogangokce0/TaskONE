from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Schedule
from .serializers import ScheduleSerializer
from .utils import generate_schedule
from course_requirement.models import CourseRequirement
from classroom.models import Classroom
from timeslot.models import TimeSlot


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
