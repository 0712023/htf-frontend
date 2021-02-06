import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueCookie from 'vue-cookie'
import VueSession from 'vue-session'

var sessionOptions = {
  persist: true
}

Vue.use(VueSession, sessionOptions)

Vue.config.productionTip = false

Vue.use(VueCookie)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
