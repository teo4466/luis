<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
      
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="mt-5"
          @click="cargardatos()"
        >
          Ver Detalle
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Detalle de Venta
        </v-card-title>
        <v-card-text>
        
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Producto
          </th>
          <th class="text-left">
            Cantidad
          </th>
           <th class="text-left">
            Subtotal
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.producto"
        >
          <td>{{ item.producto }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ item.subtotal }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

    
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
   import axios from 'axios';
  export default {
    data () {
      return {
          desserts: [],
        dialog: false,
      }
    },
    props:{
      valorRecibido:null
    },
    methods:{
  
      cargardatos(){
         this.desserts=[]
         console.log(this.valorRecibido)
             let path='http://127.0.0.1:8000/api/v1.0/DetSale/'
             
             axios.get(path).then((response)=>{
               for(let det of response.data){
                 if(det.ventaid==this.valorRecibido){
                   this.desserts.push(det)

                 }
               }
              
            }).catch((error)=>{
                console.log(error)
          });


      }
    }
  }
</script>