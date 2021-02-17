<template>
  <div id="app" style="">
    <nav class="main-nav" v-show="login">
      <Burger/><logout/>
    </nav>
    <div class="top-long-box" v-if="memId && (kakaoToken=='null') && !adminId">
      <kakaoRegister/>
    </div>
    <div class="body"><router-view></router-view></div>
    
    <Sidebar>
      <!-- member의 기본 관리 메뉴 -->
      <ul class="sidebar-panel-nav" v-if="memId">
        <li>
          <router-link :to="'/member/'+memId">Member</router-link>
        </li>
        <li>
          <router-link v-for="sensor in mchList" :key="sensor.mchId" :to="'/sensor/'+sensor.description+'/mchid/'+sensor.mchId"> - {{ sensor.description }}</router-link>
        </li>
        <li v-if="!adminId">
          <router-link to="/three">Three</router-link>
        </li>
        <li v-if="!adminId">
          <router-link to="/setting/">Setting</router-link>
        </li>
        <li v-if="!adminId">
          <router-link to="/subscribe/">Subscribe</router-link>
        </li>
        <li v-if="adminId">
          <router-link :to="'/admin/'+adminId" v-on:click.native="backToAdmin">Back to Admin</router-link>
        </li>
        <li>
          <router-link to="/chatModule/">Chat Module</router-link>
        </li>
      </ul>
        <!-- admin의 기본 관리 메뉴 -->
      <ul class="sidebar-panel-nav" v-if="!memId && adminId" >
        <li style="color:white;">
          <router-link :to="'/admin/'+this.adminId">Member List</router-link>
        </li>
        <li>
          <router-link v-for="member in members" :key="member.memId" :to="'/member/'+member.memId"> - {{ member.memId }}</router-link>
        </li>
        <li>
          <router-link :to="'/memberManage'">Member Manager</router-link>
        </li>
        <li>
          <router-link to="/chatModule/">Chat Module</router-link>
        </li>
      </ul>
      <!-- vendor 의 기본 관리 메뉴-->
      <ul class="sidebar-panel-nav" v-if="vendorId">
          <li>
          <router-link :to="'/vendor/'+vendorId">Vendor</router-link>
        </li>
        <li>
          <router-link v-for="sensor in mchList" :key="sensor.mchId" :to="'/sensor/'+sensor.description+'/mchid/'+sensor.mchId"> - {{ sensor.mchId }}</router-link>
        </li>
        <li v-if="vendorId">
          <router-link to="/machineManage/">Machine Manage</router-link>
        </li>
        <li>
          <router-link to="/chatModule/">Chat Module</router-link>
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
import kakaoRegister from './components/KakaoRegisterButton'
import axios from 'axios';

export default {
  name: "app",
  components: {
    Burger,
    Sidebar,
    Logout,
    kakaoRegister
  },
  data(){
    return {
      login:this.$cookie.get("login"),
      memId:this.$cookie.get("memId"),
      adminId:this.$cookie.get("adminId"),
      vendorId:this.$cookie.get("vendorId"),
      mchList:JSON.parse(this.$cookie.get("mchList")),
      members:JSON.parse(this.$cookie.get("members")),
      kakaoToken:this.$cookie.get("kakaoToken"),
    }
  },
  created:function(){
    Eventbus.$on('login', this.updateLogin);
    Eventbus.$on('vendor', this.updateVendorId);
    Eventbus.$on('member', this.updateMemId);
    Eventbus.$on('admin', this.updateAdminId);
    Eventbus.$on('mchList', this.updatemchList);
    Eventbus.$on('members', this.updateMembers);
    Eventbus.$on('modal', this.getMachineListByMemId);
    Eventbus.$on('modal', this.getMachineListByVendorId);
    Eventbus.$on('kakao', this.setKakaoToken);
  },
  methods:{
    updateLogin:function(s){
      this.login = s;
    },
    updatemchList:function(s){
      this.mchList = s;
    },
    updateMembers:function(s){
      this.members = s;
    },
    setKakaoToken:function(s){
      this.kakaoToken = s;
    },
    updateMemId:function(){
      this.memId = this.$cookie.get("memId");
    },
    updateAdminId:function(){
      this.adminId = this.$cookie.get("adminId");
    },
    updateVendorId:function(){
      this.vendorId = this.$cookie.get("vendorId");
    },
    backToAdmin:function(){
      this.$cookie.delete("memId");
      this.memId = false;
    },
    getMachineListByMemId(){
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`,{"memId":this.$cookie.get("memId")},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
      .then((res)=>{
          this.$cookie.set("mchList", JSON.stringify(res.data))
          this.mchList = res.data
      })
    },
    getMachineListByVendorId(){
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByVendorId`,{"vendorId":this.$cookie.get("vendorId")},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
      .then((res)=>{
          this.$cookie.set("mchList", JSON.stringify(res.data))
          this.mchList = res.data
      })
    }
  }
};
</script>
<style>
 @import './assets/css/style.css';
</style>
