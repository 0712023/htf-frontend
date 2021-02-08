<template>
  <div id="app">
    <nav class="main-nav" v-show="login">
      <Burger/><logout/>
    </nav>
    <div class="body"><router-view></router-view></div>
    
    <Sidebar>
      <ul class="sidebar-panel-nav" v-if="memId">
        <li>
          <router-link :to="'/member/'+memId">Member</router-link>
        </li>
        <li>
          <router-link v-for="sensor in sensors" :key="sensor.mchId" :to="'/sensor/'+sensor.description+'/mchid/'+sensor.mchId">{{ sensor.description }}</router-link>
        </li>
        <li>
          <router-link to="/three">Three</router-link>
        </li>
        <li v-if="adminId">
          <router-link :to="'/admin/'+adminId" v-on:click.native="backToAdmin">Admin</router-link>
        </li>
      </ul>
      <ul class="sidebar-panel-nav" v-if="!memId" >
        <!-- admin의 기본 관리 메뉴 -->
        <li style="color:white;">
          <router-link :to="'/admin/'+this.adminId">Member List</router-link>
        </li>
        <li>
          <router-link :to="'/memberManage'">Member Manager</router-link>
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
      login:this.$cookie.get("login"),
      memId:this.$cookie.get("memId"),
      adminId:this.$cookie.get("adminId"),
      sensors:JSON.parse(this.$cookie.get("sensors")),
      members:JSON.parse(this.$cookie.get("members")),
    }
  },
  created:function(){
    Eventbus.$on('login', this.updateLogin);
    Eventbus.$on('member', this.updateMemId);
    Eventbus.$on('admin', this.updateAdminId);
    Eventbus.$on('sensors', this.updateSensors);
    Eventbus.$on('members', this.updateMembers);
  },
  methods:{
    updateLogin:function(s){
      this.login = s;
    },
    updateSensors:function(s){
      this.sensors = s;
    },
    updateMembers:function(s){
      this.members = s;
    },
    updateMemId:function(){
      this.memId = this.$cookie.get("memId");
    },
    updateAdminId:function(){
      this.adminId = this.$cookie.get("adminId");
    },
    backToAdmin:function(){
      this.$cookie.delete("memId");
      this.memId = false;
    },
  }
};
</script>
<style>
 @import './assets/css/style.css';
</style>
