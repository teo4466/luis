<template>
    <v-card
    elevation="50"
    loading
    class="mx-auto mt-10"
    max-width="300"
  >
  <v-form
    v-on:submit.prevent='login'
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="nombre"
      
      label="-Usuario-"
      required
    ></v-text-field>

    <v-text-field
      v-model="contraseña"
      label="-Contraseña-"
      type="password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4 "
      block
       elevation="20"
      @click="login"
    >
      Ingresar
    </v-btn>

  </v-form>

    </v-card>
  
</template>

<script>
  import axios from 'axios'
  import {mapActions} from 'vuex'
  import swal from 'sweetalert';
  export default {
    data: () => ({
      valid: true,
      nombre: '',
      contraseña:'',
      logeado:false
     }),

    methods: {
      login(){
        let path='http://localhost:8000/api/v1.0/Usuario/'
        let usuario=this.nombre
        let contraseña=this.contraseña
        let listaUser=[]
        let exito=false

        axios.get(path)
        .then(response=>{
          
          listaUser=response.data
          for(let respuesta of listaUser){
            if(respuesta.usuario==usuario && respuesta.contraseña==contraseña){
              exito=true
              this.mocklogin()
              swal('Usuario y Contraseña correctos','','')
              this.logeado=true
              this.$router.push('/')
              }
              }
              if(exito==false){
                swal('Usuario o Contraseña incorrecto','','')
            

              }
          
          })

      },
      ...mapActions(['mocklogin'])
    },
  }
</script>
