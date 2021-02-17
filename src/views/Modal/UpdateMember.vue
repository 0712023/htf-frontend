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
        //수정하려는 pw와 re_pw가 일치하지 않을 경우 pw와 re_pw를 지움
        alert("password does not match");
        this.pw = "";
        this.re_pw = "";
      } else {
        //backend server에 member DB의 pw를 새로운 pw로 수정함
        axios.post(`${this.$store.state.BACK_SERVER}/updateMemberPw`, {"memId":this.id, "memPw":this.pw})
        .then(() => {
          alert("register success!");
          //UpdateMember modal을 가림
          EventBus.$emit("modal", false);
        })
      }
    },
  },
};
</script>