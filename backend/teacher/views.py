from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Teacher


@csrf_exempt
def create_teacher(request):

    if request.method == "POST":

        data = json.loads(request.body)

        name = data.get("name")
        off_day = data.get("off_day")

        teacher = Teacher.objects.create(
            name=name,
            off_day=off_day
        )

        return JsonResponse({
            "message": "Teacher created successfully",
            "teacher": {
                "id": teacher.id,
                "name": teacher.name,
                "off_day": teacher.off_day
            }
        })

    return JsonResponse({
        "error": "Only POST method is allowed"
    }, status=405)