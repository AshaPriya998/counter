# counterapi/serializers.py

from rest_framework import serializers
from .models import Counter

class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Counter
        fields = ['id', 'value', 'created_at', 'updated_at']
