<template>
<div>
    <v-row>
     
             <v-card
    class="ml-10 mt-10"
    max-width="344"
>
    <v-img
      src="https://www.loquequierasya.com/wp-content/uploads/2012/09/aumentar-ventas-1024x614.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Reporte de Ventas
    </v-card-title>

    <v-card-subtitle>
      Busqueda Por fecha
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      
      > <router-link to='/reportesvent'>INGRESAR</router-link>
        
      </v-btn>

      <v-spacer></v-spacer>

      
    </v-card-actions>

  
  </v-card>
  <v-card
    class="ml-10 mt-10"
    max-width="344"
>
    <v-img
      src="https://www.foodretail.es/2020/09/09/retailers/Perfil-repartidor-delivery-hombre-latino_1472862715_480710_660x372.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Reporte de Repartidores
    </v-card-title>

    <v-card-subtitle>
      Busqueda de Ventas
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
       <router-link to='/reporteempl'>INGRESAR</router-link>
      </v-btn>

      <v-spacer></v-spacer>

      
    </v-card-actions>

  
  </v-card>

   <v-card
    class="ml-10 mt-10"
    max-width="344"
>
    <v-img
      src="https://blog.comparasoftware.com/wp-content/uploads/2021/02/tipos-de-clientes-de-ecommerce-1-1024x576.png"
      height="200px"
    ></v-img>

    <v-card-title>
      Reporte de Clientes
    </v-card-title>

    <v-card-subtitle>
      Busqueda de Ventas
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        
      >
        
         <router-link to='/reportescliente'  color="orange lighten-2">INGRESAR</router-link>
      </v-btn>

      <v-spacer></v-spacer>

      
    </v-card-actions>

  
  </v-card>
  
  
   

    </v-row>
 

 
  </div>
  
  
</template>

<script>
  export default {
    data: () => ({
      
    }),
  }
</script>
