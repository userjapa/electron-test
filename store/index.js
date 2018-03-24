import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import game from './game'
import database from './database'

export default () => {
  return new Vuex.Store({
    modules: {
      g: game,
      d: database
    }
  })
}
