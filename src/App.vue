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
          <!-- <router-link v-for="member in members" :key="member.memId" :to="'/member/'+member.memId"> - {{ member.memId }}</router-link> -->
          <a v-for="member in members" href="#" :key="member.memId" @click="toUser(member.memId)" style="color: #FFF;"> - {{ member.memId }}</a>
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
import EventBus from './store/Eventbus';
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
      login:this.$cookies.get("login"),
      memId:this.$cookies.get("memId"),
      adminId:this.$cookies.get("adminId"),
      vendorId:this.$cookies.get("vendorId"),
      mchList:JSON.parse(this.$cookies.get("mchList")),
      members:JSON.parse(this.$cookies.get("members")),
      kakaoToken:this.$cookies.get("kakaoToken"),
    }
  },
  created:function(){
    EventBus.$on('login', this.updateLogin);
    EventBus.$on('vendor', this.updateVendorId);
    EventBus.$on('member', ()=>{this.updateMemId();this.updateMembers()});
    EventBus.$on('admin', this.updateAdminId);
    EventBus.$on('mchList', this.updatemchList);
    EventBus.$on('modal', ()=>{this.getMachineListByMemId();this.getMachineListByVendorId();});
    EventBus.$on('kakao', this.setKakaoToken);
  },
  methods:{
    updateLogin:function(s){
      this.login = s;
    },
    updatemchList:function(s){
      this.mchList = s;
    },
    updateMembers:function(){
      this.members = JSON.parse(this.$cookies.get("members"));
    },
    setKakaoToken:function(s){
      this.kakaoToken = s;
    },
    updateMemId:function(){
      this.memId = this.$cookies.get("memId");
    },
    updateAdminId:function(){
      this.adminId = this.$cookies.get("adminId");
    },
    updateVendorId:function(){
      this.vendorId = this.$cookies.get("vendorId");
    },
    backToAdmin:function(){
      this.$cookies.remove("memId");
      EventBus.$emit('member');
      this.memId = false;
    },
    getMachineListByMemId(){
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`,{"memId":this.$cookies.get("memId")})
      .then((res)=>{
          this.$cookies.set("mchList", JSON.stringify(res.data))
          this.mchList = res.data
      })
    },
    getMachineListByVendorId(){
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByVendorId`,{"vendorId":this.$cookies.get("vendorId")})
      .then((res)=>{
          this.$cookies.set("mchList", JSON.stringify(res.data))
          this.mchList = res.data
      })
    },
    toUser (memberId) {
      console.log(memberId);
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId": memberId})
      .then(res =>{
        this.$cookies.set("mchList", JSON.stringify(res.data));
        this.$cookies.set("memId", memberId);
        EventBus.$emit('mchList', res.data);
        EventBus.$emit('member', true);
        this.$router.push('../member/'+memberId);
      })
    },
  }
};
</script>
<style>
 @import './assets/css/style.css';
</style>
