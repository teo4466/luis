<template>
  <div class="text-center">
    <v-menu
      open-on-hover
      top
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn

          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{repSel}}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(repartidor, index) in items"
          :key="index"
          link
        >
          <v-list-item-title @click="empSel(repartidor)">{{ repartidor.nombre }}</v-list-item-title>
          
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

    <script>
    
    import axios from 'axios';
    let url='http://localhost:8000/api/v1.0/Empleado/';
  export default {
    name:'Venta',
    data: () => ({
      
      items: [],
      lista:[],
      repSel:'Repartidor',
    }),
    created () {
      this.cargarEmp()
    },
    methods:{

      cargarEmp(){

        axios.get(url).then((response)=>{
              
              this.items=response.data
              
          }).catch((error)=>{
              console.log(error)
          });
      },
      empSel(repartidor){
        this.repSel=repartidor.nombre
        axios.get(url).then((response)=>{
              
              for(let dato of response.data){
                if(dato.nombre==this.repSel){
                   this.$emit('escucharHijo', dato.id)
                   console.log(dato.id)  

                }
              }
              
          }).catch((error)=>{
              console.log(error)
          });

        
             
      }
    }
  }
</script>