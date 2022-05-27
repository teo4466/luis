<template>
  <v-app>
   <v-app-bar app class="success">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

     <v-toolbar-title>Beltran Gas</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-btn class ='primary mr-3' to='/login'>Ingresar</v-btn>
     <v-btn class="error" to='/'>Salir</v-btn>
   </v-app-bar>
   <v-navigation-drawer app v-model="drawer">
     <h3>menu vertical</h3>
      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src='./assets/logo2.jpg'></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Luis Massarino</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
           <v-list-item-content>
            <router-link to='/'>PRINCIPAL</router-link>
           
          </v-list-item-content> 
          </v-list-item>
          <v-list-item>
           <v-list-item-content>
           
            <router-link to='/clientes'>CLIENTES</router-link>
            
          </v-list-item-content>
        </v-list-item>
          <v-list-item>
           <v-list-item-content>
           
            <router-link to='/productos'>PRODUCTOS</router-link>
            
          </v-list-item-content>
        </v-list-item>
         <v-list-item>
           <v-list-item-content>
           
            <router-link to='/pedido'>PEDIDOS</router-link>
            
          </v-list-item-content>
        </v-list-item>
         <v-list-item>
           <v-list-item-content>
           
            <router-link to='/empleados'>EMPLEADOS</router-link>
            
          </v-list-item-content>
        </v-list-item>
          <v-list-item>
           <v-list-item-content>
           
            <router-link to='/reportes'>REPORTES</router-link>
            
          </v-list-item-content>
        </v-list-item>
        
          <v-list-item>
           <v-list-item-content>
           
            <router-link to='/chat'>CHAT_BOT</router-link>
            
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
        
      
    </v-navigation-drawer>
   </v-navigation-drawer>

    <v-main>
      <router-view/>
      
    </v-main>
  </v-app>
</template>

<script>

  export default {
    
    data () {
      return {
        drawer:false,
        items: [
       
        ],
      }
    }
   
  }
</script>
