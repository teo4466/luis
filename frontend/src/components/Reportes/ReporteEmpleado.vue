<template>
  <v-card   class="ml-10 mt-10"
    max-width="1200">
    <v-card-title >Ventas por Repartidor<v-spacer/>
    <Venta @escucharHijo='variablehijo'></Venta><v-spacer/><h5>Total Vendido  {{totalVendido}}</h5>
    <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
   let url='http://127.0.0.1:8000/api/v1.0/Venta/'
  import axios from 'axios';
  

  import Venta from '@/components/Ventas/Venta.vue'
  //import Empleados from '../Empleados/Empleados.vue';
  export default {
    components:{Venta},
    data () {
      return {
        totalVendido:0,  
        variablerecibida:null,
        search: '',
        empleadoSel:[],
        headers: [
          {
            
            align: 'start',
            filterable: false,
            value: 'name',
          },
        { text: 'Empleado', value: 'empleado' },
        { text: 'Fecha y Hora', value: 'fecha_hora'},
        { text: 'Total', value: 'total' },
        { text: 'Nombre/Cli', value: 'nombre' },
        { text: 'Direccion/Cli', value: 'direccion' },
        { text: 'Telefono', value: 'telefono' },
        
        ],
        desserts: []
      }
    },
  
   
    methods:{
        mounted(){
            this.initialize()

        },
           variablehijo(valor){
                this.variablerecibida=valor;
                this.desserts=[]
                this.initialize()
        },
          initialize () {
            this.totalVendido=0
            
            axios.get(url)
                .then(response=>{
                    this.empleadoSel=response.data
                    this.totalVendido=0
                    for(let venta of this.empleadoSel){
                            if(venta.idempleado==this.variablerecibida){
                                this.totalVendido+=venta.total
                                this.desserts.push(venta) 
                                  
                                   }
                  }              
                }).
                catch((error=>{
                    console.log(error)
                }))
      },
     
    }
  }
</script>