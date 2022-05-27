from django.db.models import fields
from rest_framework import serializers
from .models import Clientes, DetSale, Productos, Venta, Empleado, Usuario
from datetime import datetime

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Empleado
        fields = '__all__'

class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model= Clientes
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model= Productos
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    '''empleado = serializers.StringRelatedField()
    cli = serializers.StringRelatedField()'''
    class Meta:
        model= Venta
        fields = '__all__'
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'empleado': instance.empleado.nombre,
            'fecha_hora': datetime.strftime(instance.fecha_hora, '%d/%m/%Y -- %H:%M'),
            'fecha':datetime.strftime(instance.fecha_hora, '%Y-%m-%d'),
            'total':instance.total,
            'nombre':instance.cli.nombre,
            'direccion':instance.cli.direccion,
            'telefono':instance.cli.telefono,
            'estado':instance.stado,
            'idCliente':instance.cli.id,
            'idempleado':instance.empleado.id,
            
        }


class DetSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model= DetSale
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'ventaid':instance.venta.id,           
            "id":instance.id ,
            "precio":instance.precio,
            "cantidad":instance.cantidad,
            "subtotal":instance.subtotal,
            "producto":instance.producto.nombre
            
        }


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuario
        fields = '__all__'
