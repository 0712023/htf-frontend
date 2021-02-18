<template>
  <div id="standard2">
    Update My {{updateColumn}} <br><br>
    <input v-if="updateColumn != 'memPw'" type="text" :placeholder="'new '+updateColumn" v-model="column">
    <input v-if="updateColumn == 'memPw'" type="password" placeholder="pw" v-model="pw">
    <input v-if="updateColumn == 'memPw'" type="password" placeholder="rewrite pw" v-model="re_pw">
    <button @click="UpdateMember(updateColumn)">Update {{updateColumn}}</button>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../store/Eventbus";
export default {
  props:{
    updateColumn : String,
  },
  data() {
    return {
      id: "",
      pw: "",
      re_pw: "",
      column: ""
    };
  },
  methods: {
    UpdateMember(col) {
      if(col != 'memPw'){
        this.UpdateData();
      }else{
        this.UpdatePw();
      }
    },
    UpdatePw(){
      if (this.pw != this.re_pw) {
        //수정하려는 pw와 re_pw가 일치하지 않을 경우 pw와 re_pw를 지움
        alert("password does not match");
        this.pw = "";
        this.re_pw = "";
      } else {
        //backend server에 member DB의 pw를 새로운 pw로 수정함
        axios.post(`${this.$store.state.BACK_SERVER}/updateMemberPw`, {"memId":this.$cookies.get("memId"), "memPw":this.pw})
        .then(() => {
          alert("update success!");
          //UpdateMember modal을 가림
          EventBus.$emit("modal", false);
        })
      }
    },
    UpdateData(){
      if(this.updateColumn == 'email' && (!this.column.includes('@') || !this.column.includes('.'))){
        alert("inappropriate email form");
      } else if(this.updateColumn == 'contact' && (!this.column.includes('-', 3) || !this.column.includes('-', 8) || this.column.length != 13)){
        alert("inappropriate contact form \n ex) 000-0000-0000");
      } else {
        let body = {};
        body["memId"] = this.$cookies.get("memId");
        if(this.updateColumn != 'memid'){
          body[this.updateColumn] = this.column;
        }
        //props로 전달받은 update column의 제일 앞 글자를 대문자로 바꿈 -> backend server의 memberController의 url에 match시켜주기 위함
        let method = this.updateColumn.replace(this.updateColumn[0], this.updateColumn[0].toUpperCase());
        axios.post(`${this.$store.state.BACK_SERVER}/updateMember${method}`, body)
        .then(() => {
          alert("update success!");
          //UpdateMember modal을 가림
          EventBus.$emit("modal", false);
        })
      }
    }
  },
};
</script>