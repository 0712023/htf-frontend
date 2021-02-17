import Vue from "vue";
import Vuex from 'vuex';
import Constant from './Constant'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen : false,
    threegui : 2,
    RESTAPIKEY:'2de887fb3941336bf23b2d3a76d82991',
    ADMIN_REDIRECT_URI:'http://localhost:8080/adminKakaoToken',
    MEMBER_REDIRECT_URI:'http://localhost:8080/memberKakaoToken',
    CLIENT_SECRET:'1yEGMIcIASa5ceBAo5ZZzh1Zld4R2fmO',
    BACK_SERVER:'http://studioj.ddns.net',
    FRONT_SERVER:'http://localhost:8080'
  },
  mutations: {
    [Constant.SETISNAVOPEN]: (oldState, payload) =>{
      oldState.isNavOpen = payload;
    },
    [Constant.TOGGLENAV]: (oldState) =>{
      oldState.isNavOpen = !oldState.isNavOpen;
    },
    [Constant.ISNAVOPEN]: (oldState) =>{
      return oldState.isNavOpen;
    },
    [Constant.INSERTROUTES]: (oldState, payload) =>{
      oldState.routes = oldState.routes.concat(payload);
    },
  }
})