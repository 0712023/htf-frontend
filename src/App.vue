<template>
  <div id="app">
    <nav class="main-nav" v-show="userId">
      <Burger/><logout/>
    </nav>
    <div class="body"><router-view></router-view></div>

    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link :to="'/user/'+userId">User</router-link>
        </li>
        <li>
          <router-link v-for="sensor in sensors" :key="sensor.mchId" :to="'/sensor/'+sensor.description+'/mchid/'+sensor.mchId">{{ sensor.description }}</router-link>
        </li>
        <li>
          <router-link to="/three">Three</router-link>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from "./components/Menu/Burger.vue";
import Sidebar from "./components/Menu/Sidebar.vue";
import Logout from './components/Logout.vue';
import Eventbus from './store/Eventbus';

export default {
  name: "app",
  components: {
    Burger,
    Sidebar,
    Logout,
  },
  data(){
    return {
      userId:this.$cookie.get("userId"),
      sensors:JSON.parse(this.$cookie.get("sensors"))
    }
  },
  created:function(){
    Eventbus.$on('login', this.updatelogin);
    Eventbus.$on('sensors', this.updatesensors);
  },
  methods:{
    updatelogin:function(s){
      this.userId = s;
    },
    updatesensors:function(s){
      this.sensors = s;
    },
  }
};
</script>
<style>
 @import './assets/css/style.css';
</style>
