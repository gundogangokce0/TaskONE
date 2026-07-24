from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
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
@csrf_exempt
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
            "message": "Bu alan korumalıdır.",
            "user_id": request.user.id,
            "username": request.user.username
        })