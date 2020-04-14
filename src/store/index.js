import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '../Warehouse/Auth';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    Auth
  },
  state: {
    events: []
  },
  getters:{
    EVENTS: state => state.events
  },
  mutations: {
  },
  actions: {
  },
  /*modules: {
  }*/
})
