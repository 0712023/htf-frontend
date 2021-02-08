<template>
  <div id="app">
    <nav class="main-nav" v-show="memId">
      <Burger/><logout/>
    </nav>
    <div class="body"><router-view></router-view></div>

    <Sidebar>
      <ul class="sidebar-panel-nav" v-if="true">
        <li>
          <router-link :to="'/member/'+memId">Member</router-link>
        </li>
        <li>
          <router-link v-for="sensor in sensors" :key="sensor.mchId" :to="'/sensor/'+sensor.description+'/mchid/'+sensor.mchId">{{ sensor.description }}</router-link>
        </li>
        <li>
          <router-link to="/three">Three</router-link>
        </li>
        <li>
          <router-link to="/setting/">Setting</router-link>
        </li>

        
        <li v-if="false"> <!-- adminmode true일 경우 보여주는 메뉴 -->
          <router-link :to="'/member/'+memId">회원 관리</router-link>
        </li>
        <li v-if="false">
          <router-link :to="'/member/'+memId">어드민 모드로 돌아가기</router-link>
        </li>
      </ul>
      <ul class="sidebar-panel-nav" v-if="false" >
        <!-- admin의 기본 관리 메뉴 -->
        <li style="color:white;">
          유저 목록
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
      memId:this.$cookie.get("memId"),
      sensors:JSON.parse(this.$cookie.get("sensors")),
      members:JSON.parse(this.$cookie.get("members")),
    }
  },
  created:function(){
    Eventbus.$on('login', this.updatelogin);
    Eventbus.$on('sensors', this.updatesensors);
    Eventbus.$on('members', this.updatemembers);
  },
  methods:{
    updatelogin:function(s){
      this.memId = s;
    },
    updatesensors:function(s){
      this.sensors = s;
    },
    updatemembers:function(s){
      this.members = s;
    },
  }
};
</script>
<style>
 @import './assets/css/style.css';
</style>
