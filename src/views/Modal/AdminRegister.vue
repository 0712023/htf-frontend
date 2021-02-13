<template>
	<div id="standard2"><br><br><br>
		Register New Admin Account
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
			re_pw: "",
            RESTAPIKEY:'2de887fb3941336bf23b2d3a76d82991',
            REDIRECT_URI:'http://localhost:8080/adminKakaoToken', //front server
		};
	},
	methods: {
        register() {
			if(this.pw != this.re_pw){
				alert("password does not match");
				this.pw = "";
				this.re_pw = "";
				this.id = "";
			} else {
				axios.post(`http://studioj.ddns.net/insertAdmin`, {"adId":this.id,"adPw":this.pw})
				.then((res)=>{
					this.$cookie.set("accesstoken", res.data);
					alert("register success!");
					EventBus.$emit("modal",false);
					location.href='https://kauth.kakao.com/oauth/authorize?client_id='+this.RESTAPIKEY+'&redirect_uri='+this.REDIRECT_URI+'&response_type=code&scope=friends'
				})
				.catch((error)=>{
					console.log(error);
				})
			}
        },
	},
};
</script>
