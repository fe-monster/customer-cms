from rest_framework import serializers
from .models import Customer   

class CustomerListSerializer(serializers.ModelSerializer):
    """Для таблицы — только нужные поля"""
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'email', 'phone']


class CustomerDetailSerializer(serializers.ModelSerializer):
    """Для детальной страницы — все поля"""
    class Meta:
        model = Customer
        fields = '__all__'