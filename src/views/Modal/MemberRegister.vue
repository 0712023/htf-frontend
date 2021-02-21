<template>
	<div id="standard2">
		Register New Member Account 
		<input type="text" placeholder="id" v-model='id'>
        <input type="password" placeholder="pw" v-model='pw'>
        <input type="password" placeholder="rewrite pw" v-model='re_pw'><br>
		<button @click="register">register</button>
	</div>
</template>

<script>
import axios from 'axios'
import EventBus from '../../store/Eventbus'
export default {
	data() {
		return {
            id: "",
            pw: "",
			re_pw: ""
		};
	},
	methods: {
        register() {
			if(this.pw != this.re_pw){
				//pw입력과 re_pw입력값이 일치하지 않을 경우 알림 및 id, pw, re_pw값을 초기화
				alert("password does not match");
				this.pw = "";
				this.re_pw = "";
				this.id = "";
			} else{
				//backend server로 회원가입 요청
				axios.post(`${this.$store.state.BACK_SERVER}/insertMember`, {"memId":this.id,"memPw":this.pw,"adId":{"adId": this.$cookies.get("adminId")}}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
				.then(()=>{
					alert("member add success!");
					//MemberResgister modal을 가림
					EventBus.$emit("modal",false);
				})
			}
        },
	},
};
</script>
