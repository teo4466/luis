import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store'

import CrearCliente from '@/components/Clientes/CrearCliente'

import Pedido from '@/components/Ventas/Pedido'

import Prueba from '@/components/Ventas/Prueba'
import Productos from '@/components/Productos/Productos'
import Empleados from '@/components/Empleados/Empleados'
import Reportes from '@/components/Reportes/Reportes'
import ReporteVentas from '@/components/Reportes/ReporteVentas'
import ReporteEmpleado from '@/components/Reportes/ReporteEmpleado'
import ReportesCliente from '@/components/Reportes/ReportesCliente'

import ChatBot from '@/components/Chat/ChatBot'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatBot,
    //meta:{requiresAuth:true}
  },
  {
    path: '/reportes',
    name: 'reportes',
    component: Reportes,
    meta:{requiresAuth:true}
  },
  {
    path: '/reportesvent',
    name: 'reportesvent',
    component: ReporteVentas,
    meta:{requiresAuth:true}
  },
  {
    path: '/reportescliente',
    name: 'reportescliente',
    component:ReportesCliente,
    meta:{requiresAuth:true}
  },
  {
    path: '/reporteempl',
    name: 'reporteempl',
    component: ReporteEmpleado,
    meta:{requiresAuth:true}
  },

  {
    path: '/clientes',
    name: 'CrearCliente',
    component: CrearCliente,
    meta:{requiresAuth:true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/empleados',
    name: 'empleados',
    component: Empleados,
    meta:{requiresAuth:true}
  },

  {
    path: '/pedido',
    name: 'Pedido',
    component: Pedido,
    meta:{requiresAuth:true}
  },

  {
    path: '/Ventas/prueba',
    name: 'Prueba',
    component:Prueba,
   
  },

  {
    path: '/productos',
    name: 'Producto',
    component: Productos,
    meta:{requiresAuth:true}
  },
 

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(route=>route.meta.requiresAuth)){
    if(!store.state.loggededIn){
      next('/login')
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
