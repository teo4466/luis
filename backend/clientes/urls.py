from rest_framework import routers, urlpatterns
from .viewsets import ClientesViewSet, ProductosViewSet, VentaViewSet,UsuarioViewSet, EmpleadoViewSet, DetSaleViewSet

router = routers.SimpleRouter()
router.register('Clientes', ClientesViewSet)
router.register('Productos', ProductosViewSet)
router.register('Venta', VentaViewSet)
router.register('Usuario', UsuarioViewSet)
router.register('Empleado', EmpleadoViewSet)
router.register('DetSale', DetSaleViewSet)

urlpatterns = router.urls