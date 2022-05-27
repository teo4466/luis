<template>
  <v-simple-table
    fixed-header
    height="400px"
  >
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
           <th class="text-left">
            Eliminar
          </th>
          <th> <v-icon 
          light
          @click='cargarDatos()'
         >
        mdi-cached
      </v-icon></th>
      
          
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.producto }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ item.subtotal }}</td>
          <td> <v-icon
            small
             @click="deleteItems(item)"
            >
           mdi-delete
          </v-icon></td>

        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import axios from 'axios'
  export default {
    
    name:'DetVenta',
    data () {
      return {
        desserts: [ ],
        totalVenta:0
        
      }
    },
    props:{
      recibirIdV:null
    },
    created () {
      this.cargarDatos()
      
   },
   updated(){
     this.cargarDatos()
   },
   
    methods:{
     
          cargarDatos(){
            this.totalVenta=0
            this.desserts=[]
             let path='http://127.0.0.1:8000/api/v1.0/DetSale/'
             
             axios.get(path).then((response)=>{
              
               for(let dato of response.data){
                   if(dato.ventaid==this.recibirIdV){
                    
                       this.totalVenta+=dato.subtotal
                   
                       this.desserts.push(dato)
              
                 }
               }
               this.$emit('escucharDetVenta', this.totalVenta);
               
                               
          }).catch((error)=>{
              console.log(error)
          });

        },
        deleteItems(item){
          
            let path=`http://localhost:8000/api/v1.0/DetSale/${item.id}/`

            axios.delete(path).then((response)=>{
               console.log(response.data)
               this.cargarDatos()
              
           }).catch((error)=>{
              console.log(error)
          });

        }       
    }
  }
</script>