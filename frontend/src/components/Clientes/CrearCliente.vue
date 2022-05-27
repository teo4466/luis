<template>
   <v-card  class="ml-10 mt-10" max-width="1250">
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
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
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
              Crear Cliente
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
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
                      v-model="editedItem.nombre"
                      label="nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.direccion"
                      label="Direccion"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.telefono"
                      label="Telefono"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.mail"
                      label="E-mail"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.rut"
                      label="Rut"
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
  let url='http://localhost:8000/api/v1.0/Clientes/'
  import axios from 'axios';
  import swal from 'sweetalert';
  export default {
  
    data: () => ({

       email: '',
      emailRules: [
        
        v => /.+@.+/.test(v) || 'E-mail no valido',
      ],
      search:'',  
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          
          align: 'start',
          sortable: false,
          value: 'name',
        },
        
        { text: 'Nombre', value: 'nombre' },
        { text: 'Direccion', value: 'direccion' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'E-mail', value: 'mail' },
        { text: 'Rut', value: 'rut' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Cliente Nuevo' : 'Editar Cliente'
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

      editItem (item) {

          let path=`http://localhost:8000/api/v1.0/Clientes/${item.id}/`
          
          axios.get(path).then((response)=>{
              console.log(response.data)
              this.editedItem=response.data

          }).catch((error)=>{
              console.log(error)
          });
               
        this.editedIndex = this.desserts.indexOf(item)
        //this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
     

      deleteItem (item) {
         let path=`http://localhost:8000/api/v1.0/Clientes/${item.id}/`
          
          axios.get(path).then((response)=>{
              console.log(response.data)
              this.editedItem.id=response.data.id

          }).catch((error)=>{
              console.log(error)
          });
            
        this.editedIndex = this.desserts.indexOf(item)
        console.log(this.editedIndex)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
         let path=`http://localhost:8000/api/v1.0/Clientes/${this.editedItem.id}/`
          
          axios.delete(path).then((response)=>{
              console.log(response.data)
              
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

      save () {
        
        if (this.editedIndex > -1) {
          
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
          console.log(this.editedItem.nombre)
          
          let path=`http://localhost:8000/api/v1.0/Clientes/${this.editedItem.id}/`
          
          axios.put(path, this.editedItem ).then((response)=>{
              console.log(response.data)
    
              this.editedItem.nombre=response.data.nombre
              this.editedItem.direccion=response.data.direccion
              this.editedItem.telefono=response.data.telefono
              swal('Cliente editado exitosamente!','','')


          }).catch((error)=>{
              console.log(error)
          });
          
          

        } else {
                    
            let path='http://localhost:8000/api/v1.0/Clientes/'

              axios.post(path, this.editedItem).then((response)=>{
              console.log(response.data)
    
              this.editedItem.nombre=response.data.nombre
              this.editedItem.direccion=response.data.direccion
              this.editedItem.telefono=response.data.telefono
              swal('Cliente creado exitosamente!','','')
          
          }).catch((error)=>{
              console.log(error)
          });

          this.desserts.push(this.editedItem)
        }
         
        this.close()
      },
    },
  }
</script>