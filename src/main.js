import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import api from './common/api'

Vue.config.productionTip = false

api.init();

router.afterEach((to, from) => {
  store.commit('INCREMENT_MOVE');
  store.commit('CLEAR_NOTIFICATIONS');
  console.log('moved from ', from, ' to ', to, store.state.moveCount);
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
