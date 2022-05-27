from rest_framework import viewsets

from .models import Clientes, Productos, Usuario, Venta, Empleado, Usuario, DetSale
from .serializer import ClientesSerializer, ProductosSerializer, VentaSerializer,UsuarioSerializer, EmpleadoSerializer, DetSaleSerializer

class ClientesViewSet(viewsets.ModelViewSet):
    queryset = Clientes.objects.all()
    serializer_class = ClientesSerializer

class ProductosViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

class DetSaleViewSet(viewsets.ModelViewSet):
    queryset = DetSale.objects.all()
    serializer_class = DetSaleSerializer


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer