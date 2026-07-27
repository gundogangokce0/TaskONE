from django.db import models
from core.models import BaseModel
from schoolclass.models import SchoolClass
from course.models import Course
from teacher.models import Teacher


class CourseRequirement(BaseModel):
    school_class = models.ForeignKey(SchoolClass, on_delete=models.CASCADE, verbose_name='School Class')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Course')
    weekly_hours = models.IntegerField(verbose_name='Weekly Hours')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name='Teacher')

    def __str__(self):
        return f"{self.school_class.name} - {self.course.name} - {self.teacher.name} ({self.weekly_hours} hour)"
