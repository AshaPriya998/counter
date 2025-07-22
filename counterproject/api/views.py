from django.shortcuts import render

# counterapi/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Counter
from .serializers import CounterSerializer

class CounterView(APIView):
    def get_counter(self):
        # Get or create the single counter instance
        counter, created = Counter.objects.get_or_create(pk=1)
        return counter

    def get(self, request):
        counter = self.get_counter()
        serializer = CounterSerializer(counter)
        return Response(serializer.data)

    def post(self, request):
        counter = self.get_counter()
        action = request.data.get('action')
        
        if action == 'increment':
            counter.value += 1
        elif action == 'decrement':
            counter.value -= 1
        elif action == 'reset':
            counter.value = 0
        else:
            return Response(
                {'error': 'Invalid action'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        counter.save()
        serializer = CounterSerializer(counter)
        return Response(serializer.data)
