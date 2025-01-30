from django.contrib import admin
from django.urls import path
from backend.api import *

urlpatterns = [
    path('upload/', UploadFileView.as_view(), name='file-upload'),

]