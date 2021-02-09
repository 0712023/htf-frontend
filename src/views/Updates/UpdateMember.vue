<template>
  <div id="standard2">
    Update Member Account <br><br>
    <input type="password" placeholder="pw" v-model="pw">
    <input type="password" placeholder="rewrite pw" v-model="re_pw">
    <button @click="UpdateMember">회원정보수정</button>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../store/Eventbus";
export default {
  data() {
    return {
      id: this.$cookie.get("memId"),
      pw: "",
      re_pw: "",
    };
  },
  methods: {
    UpdateMember() {
      console.log(this.id);
      console.log(this.$cookie.get("accesstoken"));

      if (this.pw != this.re_pw) {
        alert("password does not match");
        this.pw = "";
        this.re_pw = "";
      } else {
        axios.post(`http://studioj.ddns.net/updateMember`, {"memId":this.id, "memPw":this.pw
          },{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
          .then((response) => {
            alert("register success!");
            console.log(response.data + "???");
            EventBus.$emit("modal", false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>