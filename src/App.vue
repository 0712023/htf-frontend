<template>
  <div id="app">
    <nav class="main-nav">
      <Burger/><logout/>
    </nav>
    <div class="body"><router-view></router-view></div>

    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link :to="'/user/'+userId">User</router-link>
        </li>
        <li>
          <router-link v-for="sensor in sensors" :key="sensor.mch_id" :to="'/sensor/'+sensor.mch_id">{{ sensor.mch_id }}</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
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

export default {
  name: "app",
  components: {
    Burger,
    Sidebar,
    Logout,
  },
  computed:{
    sensors:function(){
      return this.$store.state.routes;
    },
    userId:function(){
      return this.$store.state.userId;
    }
  },
  created:function(){
    console.log(this.$store.state.routes);
  }
};
</script>
<style>
 @import './assets/css/style.css';
</style>
