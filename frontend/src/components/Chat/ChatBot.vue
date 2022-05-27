<template>
  <v-card class="ml-10 mt-10 elevations-1" max-width="1100" >
    <v-card-title>
      <h3 class="center">Listado de pedidos Chat_Bot</h3>
    </v-card-title>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Telefono
          </th>
          <th class="text-left">
            Nombre
          </th>
             <th class="text-left">
            Direccion
          </th>
             <th class="text-left">
            Cantidad
          </th>
             <th class="text-left">
            Producto
          </th>
            <th class="text-left">
            Precio
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="currency in info"
          :key="currency.id"
        >
          <td>{{ currency.numero.substring(3,11) }}</td>
          <td>{{ currency.nombre }}</td>
          <td>{{ currency.direccion }}</td>
          <td>{{ currency.cantidad }}</td>
          <td>{{ currency.kilaje }}</td>
          <td>{{ currency.precio }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-card>
</template>

<script>
  import datos from '@/Bot_Whatsapp/clientes.json'
  let url='http://127.0.0.1:8000/api/v1.0/Clientes/'
  let url2='http://127.0.0.1:8000/api/v1.0/Venta/'
  import axios from 'axios';
  export default {
    data () {
      return {
        resultado:false,
        desserts: [
        
        ],
        tamDess:0
      }
    },
   
    beforeUpdate(){
       this.pedidonuevo()
    },
       computed:{
        info(){
            return datos.map((currency)=>{
                this.desserts.push(currency)
                this.tamDess=this.desserts.length
               // this.pedidonuevo()
               
                //console.log(this.desserts[(this.desserts.length-1)].nombre)
                
                
                return currency
            })
        },
     
      
    },
    methods:{
          pedidonuevo(){
              
             console.log(this.desserts)
             axios.get(url)
            .then(response=>{
                for(let dato of response.data){
                    
                    if(dato.telefono ==this.desserts[(this.desserts.length-1)]){
                         console.log('exito')
                         this.resultado=true
                         axios.post(url2,{'cli':dato.id,'empleado':6,'total':0})
                            .then(response=>{
                            }).
                            catch((error=>{
                                console.log(error)
                            }))
                    }
                }
                if(this.resultado==false){
                        axios.post(url,{'nombre':this.desserts[(this.desserts.length-1)].nombre,'direccion':this.desserts[(this.desserts.length-1)].direccion,'telefono':this.desserts[(this.desserts.length-1)].numero.substring(3,11)}).then((response2)=>{
                            console.log(response2.data)
                            

                        }).catch((error)=>{
                            console.log(error)
                        });
                    }
            }).
            catch((error=>{
                console.log(error)
            }))
        }
        
    },
  
  }
</script>