<template>
    <div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div class="wrap">
            <div v-for="(value, index) in members" :key="index">
                <div class="box1" @click="toUser(value.memId)">
                  등급 : {{value.memRank}} <br><br><br><br>
                  <h2>유저 : <a :key="index">{{value.memId}}</a></h2>
                  <br><br>
                  등급 만료일 : {{value.expireDate}}
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script type="module">
import axios from 'axios';
import EventBus from '../store/Eventbus';
export default {
  created:function(){
    EventBus.$on('modal',this.getMember);
  },
  data: function () {
    return {
      members:JSON.parse(this.$cookie.get("members"))
    };
  },
  methods: {
    toUser (memberId) {
      console.log(memberId);
      axios.post(`http://studioj.ddns.net/getMachineListByMemId`, {"memId": memberId}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
      ).then(response =>{
        this.$cookie.set("mchList", JSON.stringify(response.data), 1);
        this.$cookie.set("memId", memberId, 1);
        EventBus.$emit('mchList', response.data);
        EventBus.$emit('member', true);
        this.$router.push('../member/'+memberId);
      })
    },
    getMember(){
      axios.post(`http://studioj.ddns.net/getMemberListByAdId`, {"adId": this.$cookie.get("adminId")}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
      .then(response =>{
        this.$cookie.set("members", JSON.stringify(response.data))
      })
    }
  },
}
</script>