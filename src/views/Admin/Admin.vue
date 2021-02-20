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
import EventBus from '../../store/Eventbus';

export default {
  mounted(){
    axios.post(`${this.$store.state.BACK_SERVER}/getMemberListByAdId`, {"adId": this.$cookies.get("adminId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
    .then((res) =>{
      this.members = res.data;
    })
  },
  created:function(){
    //MemberRegister modal이 가려지면(즉, 새로운 member를 등록했을 경우) 새로운 member List를 받아옴
    EventBus.$on('modal',this.getMember);
  },
  data: function () {
    return {
      members:null
    };
  },
  methods: {
    toUser (memId) {
      //member box를 클릭했을 경우 해당 member의 machine List를 불러옴
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId": memId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
      .then(res =>{
        //memId, 반환받은 machine List를 쿠키에 저장
        this.$cookies.set("mchList", JSON.stringify(res.data));
        this.$cookies.set("memId", memId);
        //사이드바 리스트(App.vue) refresh 위한 event
        EventBus.$emit('mchList', res.data);
        EventBus.$emit('member', true);
        //해당 멤버의 member 페이지로 이동
        this.$router.push('../member/'+memId);
      })
    },
    getMember(){
      //backend server로 AdminId에 속한 Member List 요청
      axios.post(`${this.$store.state.BACK_SERVER}/getMemberListByAdId`, {"adId": this.$cookies.get("adminId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
      .then(res =>{
        //반환받은 Member List 쿠키에 저장
        this.$cookies.set("members", JSON.stringify(res.data))
      })
    }
  },
}
</script>