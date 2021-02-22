import Vue from "vue";
import Vuex from 'vuex';
import Constant from './Constant'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen : false,
    threegui : 2,
    RESTAPIKEY:'e84e333a2e7f3b24ae892baa9d6102a4', //카카오 App의 rest api key
    ADMIN_REDIRECT_URI:'http://localhost:8080/adminKakaoToken', //admin 카카오 토큰 획득 성공시 redirect되는 url
    MEMBER_REDIRECT_URI:'http://localhost:8080/memberKakaoToken', //member 카카오 토큰 획득 성공시 redirect되는 url
    CLIENT_SECRET:'Umh8oeFqcbkItVe5lQnA0L8pjdgwnrog', //카카오 App의 client secret key
    BACK_SERVER:'http://studioj.ddns.net', //HTF 프로젝트의 backend server
    FRONT_SERVER:'http://localhost:8080' //HTF 프로젝트의 frontend server
  },
  mutations: {
    [Constant.SETISNAVOPEN]: (oldState, payload) =>{ //nav bar 상태 설정
      oldState.isNavOpen = payload;
    },
    [Constant.TOGGLENAV]: (oldState) =>{ //nav bar 상태 토글
      oldState.isNavOpen = !oldState.isNavOpen;
    },
    [Constant.ISNAVOPEN]: (oldState) =>{ //nav bar 상태 return
      return oldState.isNavOpen;
    },
    [Constant.INSERTROUTES]: (oldState, payload) =>{
      oldState.routes = oldState.routes.concat(payload);
    },
  }
})