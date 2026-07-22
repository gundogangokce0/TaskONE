from django.urls import path

from .views import create_teacher


urlpatterns = [

    path(
        "create/",
        create_teacher,
        name="create_teacher"
    ),

]