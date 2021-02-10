import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueCookie from 'vue-cookie'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(VModal)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
