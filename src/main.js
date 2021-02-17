import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueCookies from 'vue-cookies'
import VModal from 'vue-js-modal'
import axios from 'axios';

Vue.config.productionTip = false

//최초 로그인 제외 모든 backend server로의 post 요청은 accesstoken을 담아서 보내야함 (JWT)
axios.defaults.headers.common['Authorization'] = 'Bearer '+VueCookies.get("accesstoken");
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//쿠키의 지속시간은 1일
VueCookies.config('1d');
Vue.use(VueCookies)
Vue.use(VModal)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
