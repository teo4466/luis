<template>
   <v-card>
    <v-card-title>
      Selecciona Productos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchs"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="headerss"
    :items="dessertss"
    :search='searchs'
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
      
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogs"
          max-width="400px"
        >
          
          <v-card>
            <v-card-title>
              <span class="text-h5">Agregar Cantidad del Producto</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItems.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItems.cantidad"
                      label="Cantidad"
                    ></v-text-field>
                  </v-col>
                 
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closes"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saves"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
       
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
     
    
         <v-btn
      class="mx-2"
      small
      fab
      dark
      color="indigo"
       @click="editItems(item)"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initializes"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
  let url='http://127.0.0.1:8000/api/v1.0/Productos/'
  import axios from 'axios';
 
  export default {
  
    data: () => ({
      
      idproducto:0,
      subtotal:0,
      searchs:'',  
      dialogs: false,
      dialogDeletes: false,
      headerss: [
        {
          
          align: 'start',
          sortable: false,
          value: 'name',
        },
        
        { text: 'Nombre', value: 'nombre' },
        { text: 'Precio', value: 'precio' },
        { text: 'Agregar', value: 'actions', sortable: false },
      ],
      dessertss: [],
      editedIndexs: -1,
      editedItems: {},
      defaultItems: {},
    }),
    props:{
      recibirIdVenta:0
    },

    computed: {
   
    },

    watch: {
      dialogs (val) {
        val || this.closes()
      },
      dialogDeletes (val) {
        val || this.closeDeletes()
      },
    },

    created () {
      this.initializes()
    },

    methods: {
      initializes () {
        axios.get(url)
            .then(response=>{
                this.dessertss= response.data
            }).
            catch((error=>{
                console.log(error)
            }))
      },

      editItems (item) {

          let path=`http://localhost:8000/api/v1.0/Productos/${item.id}/`
          
          axios.get(path).then((response)=>{
              
              this.editedItems=response.data
              this.idproducto=response.data.id
              this.editedItems.cantidad=0

          }).catch((error)=>{
              console.log(error)
          });
               
        this.editedIndexs = this.dessertss.indexOf(item)
        //this.editedItem = Object.assign({}, item)
        this.dialogs = true
      },

      closes () {
        this.dialogs = false
        this.$nextTick(() => {
          this.editedItems = Object.assign({}, this.defaultItems)
          this.editedIndexs = -1
        })
      },

       

      saves () {

        if (this.editedIndex > -1){
          Object.assign(this.dessertss[this.editedIndexs], this.editedItems);
           let path='http://127.0.0.1:8000/api/v1.0/DetSale/'
          this.subtotal=this.editedItems.precio * this.editedItems.cantidad
          console.log(this.idproducto)    
          let precio=this.editedItems.precio
          let cantidad=this.editedItems.cantidad
          let subtotal=this.subtotal
          let idVent= this.recibirIdVenta
          let producto=this.idproducto
                   
          axios.post(path,{'precio':precio, 'cantidad':cantidad, 'subtotal':subtotal,'venta':idVent,'producto':producto} )
          .then((response)=>{
            console.log(response.data)
            console.log('exito')
                     
          }).catch((error)=>{
              console.log(error)
          });


        }else{
           let path='http://127.0.0.1:8000/api/v1.0/DetSale/'
          this.subtotal=this.editedItems.precio * this.editedItems.cantidad
          console.log(this.idproducto)    
          let precio=this.editedItems.precio
          let cantidad=this.editedItems.cantidad
          let subtotal=this.subtotal
          let idVent= this.recibirIdVenta
          let producto=this.idproducto
                   
          axios.post(path,{'precio':precio, 'cantidad':cantidad, 'subtotal':subtotal,'venta':idVent,'producto':producto} )
          .then((response)=>{
            console.log(response.data)
            console.log('exito')
                     
          }).catch((error)=>{
              console.log(error)
          });


        }
        this.closes()
      },
    },
  }
</script>