<template>
   <v-card  class="ml-10 mt-10" max-width="1250">
    <v-card-title>
      Beltran Gas
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
        <v-toolbar-title>Productos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogs"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Crear Producto
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitles }}</span>
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
                      v-model="editedItems.stock"
                      label="Stock"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItems.precio"
                      label="Precio"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItems.telefono2"
                      label="Telefono"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItems.protein"
                      label="Otro"
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
        <v-dialog v-model="dialogDeletes" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Estas seguro de borrar el registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeletes">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirms">Si</v-btn>
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
        @click="editItems(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItems(item)"
      >
        mdi-delete
      </v-icon>
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
  import swal from 'sweetalert';
  export default {
  
    data: () => ({
    
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
        { text: 'Stock', value: 'stock' },
        { text: 'Precio', value: 'precio' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dessertss: [],
      editedIndexs: -1,
      editedItems: {},
      defaultItems: {},
    }),

    computed: {
      formTitles () {
        return this.editedIndexs === -1 ? 'Cliente Nuevo' : 'Editar Cliente'
      },
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
              console.log(response.data)
              this.editedItems=response.data

          }).catch((error)=>{
              console.log(error)
          });
               
        this.editedIndexs = this.dessertss.indexOf(item)
        //this.editedItem = Object.assign({}, item)
        this.dialogs = true
      },
     

      deleteItems (item) {
         let path=`http://localhost:8000/api/v1.0/Productos/${item.id}/`
          
          axios.get(path).then((response)=>{
              console.log(response.data)
              this.editedItems.id=response.data.id

          }).catch((error)=>{
              console.log(error)
          });
            
        this.editedIndexs = this.dessertss.indexOf(item)
        console.log(this.editedIndexs)
        this.dialogDeletes = true
      },

      deleteItemConfirms () {
         let path=`http://localhost:8000/api/v1.0/Productos/${this.editedItems.id}/`
          
          axios.delete(path).then((response)=>{
              console.log(response.data)
              
           }).catch((error)=>{
              console.log(error)
          });
        
          
        this.dessertss.splice(this.editedIndexs, 1)
        this.closeDeletes()
      },

      closes () {
        this.dialogs = false
        this.$nextTick(() => {
          this.editedItems = Object.assign({}, this.defaultItems)
          this.editedIndexs = -1
        })
      },

        closeDeletes () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItems = Object.assign({}, this.defaultItems)
          this.editedIndexs = -1
        })
      },

      saves () {
        
        if (this.editedIndexs > -1) {
          
          Object.assign(this.dessertss[this.editedIndexs], this.editedItems);
          console.log(this.editedItems.id)
          
          let path=`http://localhost:8000/api/v1.0/Productos/${this.editedItems.id}/`
          
          axios.put(path, this.editedItems ).then((response)=>{
              console.log(response.data)
    
              this.editedItems.nombre=response.data.nombre
              this.editedItems.stock=response.data.stock
              this.editedItems.precio=response.data.precio
              swat( 'Producto editado exitosamente!','','')


          }).catch((error)=>{
              console.log(error)
          });
          
          

        } else {

          
                   
            let path='http://localhost:8000/api/v1.0/Productos/'

              axios.post(path, this.editedItems).then((response)=>{
              
              this.editedItems.nombre=response.data.nombre
              this.editedItems.stock=response.data.stock
              this.editedItems.precio=response.data.precio
              swal('Producto creado exitosamente!','','')
          
          }).catch((error)=>{
              console.log(error)
          });

          this.dessertss.push(this.editedItems)
        }
         
        this.closes()
      },
    },
  }
</script>