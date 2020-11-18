import iop from '@/iop/store/index'
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    app,
    iop
  },
  getters
})
