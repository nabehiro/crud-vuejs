import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moveCount: 0
  },
  mutations: {
    INCREMENT_MOVE(state) {
      state.moveCount += 1;
    }
  },
  actions: {
  },
  modules: {
  }
})
