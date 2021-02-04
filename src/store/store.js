import Vue from "vue";
import Vuex from 'vuex';
import Constant from './Constant'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen : true,
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
  }
})