from django.urls import path
from .views import create_teacher
from teacher.views import login_user, ProtectedView
 

urlpatterns = [
    path(
        "create/",
        create_teacher,
        name="create_teacher",
    ),
    path("api/login/", login_user, name="login_user"),

    path(
    "api/protected/",
    ProtectedView.as_view(),
    name="protected",
),
]  