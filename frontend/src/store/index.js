import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
export default new Vuex.Store({
  state: {
    loggededIn:false
    },
   
  
  mutations: {
    loggededIn(state){
      state.loggededIn=true
    }
  
  },
  actions: {
    mocklogin(context){
      setTimeout(function(){
        context.commit('loggededIn')
      },1000)
    }
  },
  modules: {
  }
})
