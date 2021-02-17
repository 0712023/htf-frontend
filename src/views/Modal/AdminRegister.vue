<template>
	<div id="standard2">
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
			} else {
				//backend server로 회원가입 요청
				axios.post(`${this.$store.state.BACK_SERVER}/insertAdmin`, {"adId":this.id,"adPw":this.pw})
				.then((res)=>{
					//adminToken.vue에서 backend sever의 updateAdminToken로 post를 날리기 위해 accesstoken과 adId를 쿠키에 임시로 저장함 (token 저장 후 삭제 예정)
					this.$cookies.set("accesstoken", res.data);
					this.$cookies.set("adId", this.id);
					alert("register success!");
					//AdminRegister modal 가림
					EventBus.$emit("modal",false);
					//카카오톡 토큰 발급 위한 페이지 이동
					location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${this.$store.state.RESTAPIKEY}&redirect_uri=${this.$store.state.ADMIN_REDIRECT_URI}&response_type=code&scope=friends,talk_message`;
				})
			}
        },
	},
};
</script>
