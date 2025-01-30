from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
import json

from backend.serializers import FileUploadSerializer


class UploadFileView(APIView):
    def post(self, request, *args, **kwargs):
        # Usa il serializer per gestire il file
        serializer = FileUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            # Leggi il contenuto del file JSON
            file = request.FILES['file']
            file_data = file.read().decode('utf-8')  # Legge il file JSON come stringa
            try:
                data = json.loads(file_data)  # Prova a caricare il JSON
                # Puoi fare qualche operazione con i dati qui
                return Response(data, status=status.HTTP_200_OK)
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

