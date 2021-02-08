<template>
    <div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap">
            <div v-for="(value, index) in members" :key="index">
                <div class="box1" >
                    유저 : <a @click="toUser(value.memId)">{{value.memId}}</a>
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
  computed: {
    members() {
      return JSON.parse(this.$cookie.get("members"));
    }
  },
  data: function () {
    return {
      user: [],
    };
  },
  methods: {
    toUser (v) {
      console.log(v);
      axios.post(`http://studioj.ddns.net/getMachineListByMemId`, {"memId": v}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
      ).then(response =>{
        console.log(response.data);
        this.$cookie.set("sensors", JSON.stringify(response.data), 1);
        console.log(this.$cookie.get("sensors"));
        EventBus.$emit('sensors', response.data);
        this.$router.push('../member/'+v);
      })
    }
  }
}
</script>