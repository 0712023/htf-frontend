<template>
	<div id="standard2">
		Register New Admin Account <br><br>
		<input type="text" placeholder="id" v-model='id'>
        <input type="password" placeholder="pw" v-model='pw'>
        <input type="password" placeholder="rewrite pw" v-model='re_pw'>
		<button @click="checkForm">회원가입</button>
	</div>
</template>

<script>
import axios from 'axios'
import EventBus from '../store/Eventbus'
export default {
	name: 'SignupForm',
	data() {
		return {
            id: "",
            pw: "",
			re_pw: ""
		};
	},
	methods: {
        checkForm() {
			if(this.pw != this.re_pw){
				alert("password does not match");
				this.pw = "";
				this.re_pw = "";
				this.id = "";
			} else if(this.$cookie.get("adminId")!=null){
				axios.post(`http://studioj.ddns.net/insertMember`, {"memId":this.id,"memPw":this.pw,"memRank":"silver","adId":{"adId": this.$cookie.get("adminId")}}
				,{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
				.then((res)=>{
					console.log(res.data);
					alert("member add success!");
					EventBus.$emit("modal",false);
				})
				.catch((error)=>{
					console.log(error);
				})
			} else {
				axios.post(`http://studioj.ddns.net/insertAdmin`, {"adId":this.id,"adPw":this.pw})
				.then((res)=>{
					console.log(res.data);
					alert("register success!");
					EventBus.$emit("modal",false);
				})
				.catch((error)=>{
					console.log(error);
				})
			}
        },
	},
};
</script>
