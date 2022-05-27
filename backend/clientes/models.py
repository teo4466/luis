from email.policy import default
from django.db import models
from datetime import datetime, date

from django.forms import BooleanField, DateTimeField

class Empleado(models.Model):
    nombre = models.CharField(max_length=60)
    direccion = models.TextField()
    telefono = models.CharField(max_length=12)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Empleado'
        verbose_name_plural = 'Empleados'
        ordering = ['id']

class Clientes(models.Model):
    
    nombre = models.CharField(max_length=60)
    direccion = models.TextField()
    telefono = models.CharField(max_length=12)
    mail=models.CharField(max_length=50, default='')
    rut=models.CharField(max_length=30, default='Consumidor Final')

    def __str__(self):
        return self.direccion 

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Cliente'
        ordering = ['id']

class Venta(models.Model) :
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField(auto_now_add= True)
    total = models.DecimalField(default=0.0, max_digits=9, decimal_places=2)
    cli = models.ForeignKey(Clientes, on_delete=models.CASCADE)
    stado = models.BooleanField(default=False)
    
    def __str__(self):
        return self.cli.nombre
    
    class Meta:
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'
        ordering = ['id']


class Productos(models.Model):
    nombre = models.CharField(max_length=150, verbose_name='Nombre', unique=True)
    stock = models.IntegerField(default=0, verbose_name='Stock')
    precio = models.DecimalField(default=0.00, max_digits=9, decimal_places=2, verbose_name='Precio de venta')

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['nombre']


class DetSale(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Productos, on_delete=models.CASCADE)
    precio = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    cantidad = models.IntegerField(default=0)
    subtotal = models.IntegerField(default=0.00)

    def __str__(self):
        return self.producto.nombre

    class Meta:
        verbose_name = 'Detalle de Venta'
        verbose_name_plural = 'Detalle de Ventas'
        ordering = ['id']


class Usuario(models.Model):
    usuario = models.CharField(max_length=60)
    contraseña = models.TextField()

    def __str__(self):
        return self.usuario

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['id']