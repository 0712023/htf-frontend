<template>
    <div>
        <div style="width:100%;">
          <div class="top-long-box">
            <h3>Number of Members : {{members.length}}</h3>
          </div>
          <div class="wrap">
            <!-- <div class="top-long-box" style="grid-column: 1 / span 3;"></div> -->
            <div v-for="(value, index) in members" :key="index">
              <div class="box1" @click="toUser(value.memId)">
                <div>
                    Grade : {{value.memRank}} <br><br><br><br>
                    <h2>User : <a :key="index">{{value.memId}}</a></h2>
                    <br><br>
                    Expiring Date : {{value.expireDate}}
                </div>
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
      members:JSON.parse(this.$cookies.get("members"))
    };
  },
  methods: {
    toUser (memberId) {
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId": memberId})
      .then(res =>{
        this.$cookies.set("mchList", JSON.stringify(res.data));
        this.$cookies.set("memId", memberId);
        EventBus.$emit('mchList', res.data);
        EventBus.$emit('member', true);
        this.$router.push('../member/'+memberId);
      })
    },
    getMember(){
      axios.post(`${this.$store.state.BACK_SERVER}/getMemberListByAdId`, {"adId": this.$cookies.get("adminId")})
      .then(res =>{
        this.$cookies.set("members", JSON.stringify(res.data))
      })
    }
  },
}
</script>