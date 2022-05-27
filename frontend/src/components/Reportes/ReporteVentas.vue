<template>
  <v-row>
    <v-col
     
    >
      <v-date-picker
        
        v-model="dates"
        range
        class="mt-5 ml-15"
      ></v-date-picker>
    </v-col>
    <v-col
    
    >
    <v-btn color="primary" class="mt-5" @click="cargardatos()">Cargar Datos</v-btn>
    <v-spacer></v-spacer>
    <h4 class="mt-3">Total Vendido  ${{total}}</h4>
   

      <v-text-field
        v-model="dateRangeText"
        label="Rango de fechas"
        prepend-icon="mdi-calendar"
        readonly
        class="mr-15"
      ></v-text-field>
  
      
    <template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1 mr-15"

  ></v-data-table>
</template>

    </v-col>
  </v-row>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      total:0,
      dates: [],
      desserts: [],
        headers: [
          {
            text: 'Empleado',
            value:'empleado'
          },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Direccion', value: 'direccion' },
          { text: 'Total', value: 'total' },
         
        ],
    }),
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
   
    methods:{
      cargardatos(){
         this.total=0
         this.desserts=[]
         let path='http://127.0.0.1:8000/api/v1.0/Venta/'

           axios.get(path).then((response)=>{
             for(let dato of response.data){ 
                   let fechaBase= new Date(dato.fecha)
                   let fechaIng= new Date(this.dates[0])
                   let fechaIng2= new Date(this.dates[1])
                   //console.log(fechaBase)
                   //console.log(fechaIng)
                   if(fechaBase.getTime()>=fechaIng.getTime() && fechaBase.getTime()<=fechaIng2.getTime()){
                     this.total+=dato.total
                     this.desserts.push(dato)
                        }
                   }
            }).catch((error)=>{
              console.log(error)
          });
      },
     

    }
  }
</script>