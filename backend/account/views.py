from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView



class RegisterAPIView(APIView):
    def post(self, request):




class ExampleAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        return HttpResponse(data.values())