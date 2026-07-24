from django.urls import path

from .views import create_teacher, login_user, ProtectedView
 

urlpatterns = [
    path(
        "create/",
        create_teacher,
        name="create_teacher",
    ),
    path(
        "login/",
        login_user,
        name="login_user",
    ),
    path(
    "protected/",
    ProtectedView.as_view(),
    name="protected",
    ),
]