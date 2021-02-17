<template>
  <div id="standard2">
    Update Member Account <br><br>
    <input type="password" placeholder="pw" v-model="pw">
    <input type="password" placeholder="rewrite pw" v-model="re_pw">
    <button @click="UpdateMember">Update Password</button>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../store/Eventbus";
export default {
  data() {
    return {
      id: this.$cookies.get("memId"),
      pw: "",
      re_pw: "",
    };
  },
  methods: {
    UpdateMember() {
      if (this.pw != this.re_pw) {
        alert("password does not match");
        this.pw = "";
        this.re_pw = "";
      } else {
        axios.post(`${this.$store.state.BACK_SERVER}/updateMemberPw`, {"memId":this.id, "memPw":this.pw})
        .then(() => {
          alert("register success!");
          EventBus.$emit("modal", false);
        })
      }
    },
  },
};
</script>