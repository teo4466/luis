<template>
 
      <v-row>
      <v-card class="ml-15 mt-7" max-width="650" >
       <v-data-table
            v-model="selected"
            :search='search'
            :headers="headers"
            :items="desserts"
            :single-select="singleSelect"
            item-key="id"
            show-select
            class="elevation-5"
            :items-per-page="5"
  >    
    <template v-slot:top>
   
      <v-col>
         <v-btn  color="primary" dark @click='seleccion'>Ver Ventas </v-btn>  
     
       <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar Cliente"
            single-line
            hide-details
        ></v-text-field>

      </v-col>
    
     
    </template>
    
    
  </v-data-table>


  </v-card>

  <v-card  class="ml-15 mt-10" max-width="650">
     <v-data-table
        v-model="selecteds"
        :headers="headerss"
        :items="dessertss"
        :single-select="singleSelects"
        item-key="id"
        show-select
        class="elevation-5"
  >
   <template v-slot:top>
       
        <ReporteDetVent :valorRecibido='numeroAenviar'></ReporteDetVent>
    </template></v-data-table>
  </v-card>
  
  </v-row>


</template>

<script>
let url='http://localhost:8000/api/v1.0/Clientes/'
let url2='http://127.0.0.1:8000/api/v1.0/Venta/'
  import axios from 'axios';
  import ReporteDetVent from '@/components/Reportes/ReporteDetVent.vue'
  export default {
     components:{ReporteDetVent},
    data () {
      return {
        search:'',    
        singleSelect: true,
        singleSelects: true,
        selected: [],
        selecteds: [],
        numeroAenviar:null,
        
        headers: [
          {
            text: 'Cliente Nº',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          
          { text: 'Nombre', value: 'nombre' },
          { text: 'Direccion', value: 'direccion' },
          { text: 'Telefono', value: 'telefono' },
         ,
        ],
         headerss: [
          {
            text: 'Venta Nº',
            align: 'start',
            sortable: false,
            value: 'id',
          },
           { text: 'Empleado', value: 'empleado' },
           { text: 'Fecha', value: 'fecha_hora' },
          { text: 'Total', value: 'total' },
          ],
        desserts: [],
         dessertss: [],
      }
    },
    created () {
      this.initialize()
   
    },
   
    methods: {
      initialize () {
          
        axios.get(url)
            .then(response=>{
                        
                this.desserts= response.data   
                              
            }).
            catch((error=>{
                console.log(error)
            }))
      },
        initialize2 () {
             
             axios.get(url2)
                .then(response=>{
                      for(let vent of response.data){
                         
                          if(vent.idCliente==this.selected[0].id){
                             
                              this.dessertss.push(vent)
                              this.numeroAenviar=vent.id
                              console.log(this.numeroAenviar)
                      }
                      }  
                       
                              
            }).
            catch((error=>{
                console.log(error)
            }))
      },
      seleccion(){
         
        
          this.initialize2()
      }
    }
  
  }
</script>