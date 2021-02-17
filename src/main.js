import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueCookies from 'vue-cookies'
import VModal from 'vue-js-modal'
import axios from 'axios';

Vue.config.productionTip = false

axios.defaults.headers.common['Authorization'] = 'Bearer '+VueCookies.get("accesstoken");
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
VueCookies.config('1d');
Vue.use(VueCookies)
Vue.use(VModal)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
