<template>
   <v-card class="ml-10 mt-10" max-width="1250">
    <v-card-title>
      Beltran Gas
      <v-spacer></v-spacer>
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
          :search='search'
          sort-by="calories"
          class="elevation-1"
        >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{TituloPedidos}}
           <v-btn
                class="mr-3"
                depressed
                color="success"
                @click='listaCumplidos'
                >
              Cumplidos   <v-icon
          right>
          mdi-checkbox-marked-circle
        </v-icon>
          </v-btn>
           <v-btn
                class="mr-3"
                depressed
                color="warning"
                @click='listaPendientes'
                >
              pendientes<v-icon
          dark
          right
        >
          mdi-cancel
        </v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="1200px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Crear Pedido<v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
            <v-btn
            class="mr-3 mb-2"
            @click=listaPendientes() >
             Actualizar
              <v-icon 
              light
              
              >
                mdi-cached
              </v-icon>
            </v-btn>

             
           
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                 
                  <v-col>
                  
                  </v-col>
                  <v-col>
                    <Venta @escucharHijo='variableHijo'></Venta>
                  </v-col>

                  <v-col
                   
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre/Cliente"
                    ></v-text-field>
                  </v-col>
                  <v-col
                   
                  >
                    <v-text-field
                      v-model="editedItem.direccion"
                      label="Direccion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                  
                  >
                    <v-text-field
                      v-model="editedItem.telefono"
                      label="Telefono"
                      v-on:keyup.enter='buscarCli'
                    ></v-text-field>
                  </v-col>
                    <v-btn
                      class="mt-3"
                      color="primary"
                      dark
                      @click="ingresarCli"
                    >
                      ING/CLIENTE
                    </v-btn>
                  
                </v-row>
                <v-row>
                  <ProVenta :recibirIdVenta='idparaProVenta'></ProVenta>
                  <DetVenta :recibirIdV='idparaDetSale' class="ml-10" @escucharDetVenta='variableDetV'></DetVenta>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Estas seguro de borrar el registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
     
          <v-icon
          link
          @click='cumplido(item)'
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
       
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
  let url='http://127.0.0.1:8000/api/v1.0/Venta/'
  import axios from 'axios';
  import swal from 'sweetalert';
  

  import ProVenta from '@/components/Ventas/ProVenta.vue'
  import Venta from '@/components/Ventas/Venta.vue'
  import DetVenta from '@/components/Ventas/DetVenta.vue'

  export default {
    components:{ProVenta,Venta, DetVenta},
    data: () => ({
    
      totalVenta:0,
      idparaProVenta:0,
      idparaDetSale:0,
      TituloPedidos:'',
      idcliVenta:null,
      mensajeHijo:null,
      total:0,
      search:'',  
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          
          align: 'start',
          sortable: false,
          value: 'name',
        },
        
        { text: 'Empleado', value: 'empleado' },
        { text: 'Fecha y Hora', value: 'fecha_hora'},
        { text: 'Total', value: 'total' },
        { text: 'Nombre/Cli', value: 'nombre' },
        { text: 'Direccion/Cli', value: 'direccion' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Acccion', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
    }),

    computed: {
      
      formTitle () {
        return this.editedIndex === -1 ? 'Pedido Nuevo' : 'Editar Pedido'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.listaPendientes()
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
      variableDetV(valor){
        this.totalVenta=valor;
      },
      buscarCli(){
        let exito=false
        let url='http://127.0.0.1:8000/api/v1.0/Clientes/'
        
         axios.get(url)
            .then(response=>{
                for(let cli of response.data){
                  if(cli.telefono==this.editedItem.telefono){
                      exito=true
                      this.editedItem.nombre=cli.nombre
                      this.editedItem.direccion=cli.direccion       
                      this.editedItem.telefono=this.editedItem.empleado 
                      this.editedItem.telefono=cli.telefono
                      console.log(this.editedItem.empleado)
                      swal('Ya es cliente',cli.nombre+' , '+ cli.direccion,'')
            
                     }
                }if(exito==false){
                   swal('Cliente Nuevo',' ','')

                }
           
            }). catch((error=>{
                console.log(error)
            }))

      },

      listaCumplidos(){
        this.TituloPedidos='Pedidos Cumplidos'
        this.desserts=[]
        axios.get(url)
            .then(response=>{
                for(let vent of response.data){
                  if(vent.estado==true){
                    this.desserts.push(vent) 

                  }
                }
                
            }).
            catch((error=>{
                console.log(error)
            }))

      },
      listaPendientes(){
        this.TituloPedidos='Pedidos Pendientes'
        this.desserts=[]
        axios.get(url)
            .then(response=>{
                for(let vent of response.data){
                  if(vent.estado==false){
                    this.desserts.push(vent) 

                  }
                }
                
            }).
            catch((error=>{
                console.log(error)
            }))

      },

      cumplido(item){
        
        item.estado=true
        let path=`http://localhost:8000/api/v1.0/Venta/${item.id}/`
          
          axios.put(path,{'empleado':item.idempleado,'cli':item.idCliente,'stado':item.estado}).then((response)=>{
                  
            console.log(response.data.estado)
            this.listaPendientes()
             swal('Pedido Cumplido!','','')
          }).catch((error)=>{
              console.log(error)
          });
          

      },

      variableHijo(mensaje){

        this.mensajeHijo=mensaje;
       
      },

      editItem (item) {
          
          console.log(this.totalVenta)
          let path=`http://localhost:8000/api/v1.0/Venta/${item.id}/`
          
          axios.get(path).then((response)=>{
                  
              this.editedItem=response.data
              this.idparaProVenta=this.editedItem.id
              this.idparaDetSale=this.editedItem.id
              
          }).catch((error)=>{
              console.log(error)
          });
               
        this.editedIndex = this.desserts.indexOf(item)
       
        this.dialog = true
      },
     

      deleteItem (item) {
         let path=`http://localhost:8000/api/v1.0/Venta/${item.id}/`
          
          axios.get(path).then((response)=>{
              console.log(response.data)
              this.editedItem.id=response.data.id

          }).catch((error)=>{
              console.log(error)
          });
            
        this.editedIndex = this.desserts.indexOf(item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
         let path=`http://localhost:8000/api/v1.0/Venta/${this.editedItem.id}/`
          
          axios.delete(path).then((response)=>{
              
              
           }).catch((error)=>{
              console.log(error)
          });
        
          
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

        closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      ingresarCli(){

        let path='http://localhost:8000/api/v1.0/Clientes/'
         axios.post(path, {'nombre':this.editedItem.nombre, 'direccion':this.editedItem.direccion, 'telefono':this.editedItem.telefono})
         .then((response)=>{
           this.idcliVenta=response.data.id
           
           this.idparaProVenta=response.data.id
            console.log(this.idparaProVenta)
              
              
           }).catch((error)=>{
              console.log(error)
          });


      },

      save () {
        
        if (this.editedIndex > -1) {
          
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
          
          
          if(this.mensajeHijo==null){
             let path=`http://localhost:8000/api/v1.0/Venta/${this.editedItem.id}/`
             let path2=`http://localhost:8000/api/v1.0/Clientes/${this.editedItem.idCliente}/`
             
             axios.put(path2, {'nombre':this.editedItem.nombre,'direccion':this.editedItem.direccion,'telefono':this.editedItem.telefono})
             .then((response)=>{
               this.editedItem.idempleado=response.data.id
               this.editedItem.idCliente=response.data.id
               
                 
             
             }).catch((error)=>{
              console.log(error)
             });

             let empleado=this.editedItem.idempleado
             let cliente=this.editedItem.idCliente

             axios.put(path, {'empleado':empleado,'cli':cliente,'total':this.totalVenta})
             .then((response)=>{
               console.log(response.data)
                 
             
             }).catch((error)=>{
              console.log(error)
             });
             

          }else{
            
             let path=`http://localhost:8000/api/v1.0/Venta/${this.editedItem.id}/`
             let path2=`http://localhost:8000/api/v1.0/Clientes/${this.editedItem.idCliente}/`
             

             axios.put(path2, {'nombre':this.editedItem.nombre,'direccion':this.editedItem.direccion,'telefono':this.editedItem.telefono})
             .then((response)=>{
               
               this.editedItem.idCliente=response.data.id
                              
             }).catch((error)=>{
              console.log(error)
             });
             console.log(this.mensajeHijo)
             let empleado=this.mensajeHijo
             let cliente=this.editedItem.idCliente
             let total=this.totalVenta
             axios.put(path, {'empleado':empleado,'cli':cliente,'total':total}).then((response)=>{
               
               this.editedItem=response.data  
             
             }).catch((error)=>{
              console.log(error)
             });


          }    
          

        } else {

            if(this.mensajeHijo==null){
               swal('Ingresa el repartidor','','')

            }else{
              let path='http://localhost:8000/api/v1.0/Venta/'              
              let total=this.totalVenta 
              let empleado=this.mensajeHijo
              let cliente=this.idcliVenta
             
                axios.post(path, {'empleado':empleado,'cli':cliente, 'total':total})
                .then((response)=>{
              
                  this.editedItem=response.data
                  this.desserts.push(this.editedItem)
                  
                  swal('Venta creada exitosamente!','','')
          
          }).catch((error)=>{
                 console.log(error)
          });  

            }
          }
         
        this.close()
      },
    },
  }
</script>