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
				alert("password does not match");
				this.pw = "";
				this.re_pw = "";
				this.id = "";
			} else{
				axios.post(`${this.$store.state.BACK_SERVER}/insertMember`, {"memId":this.id,"memPw":this.pw,"adId":{"adId": this.$cookie.get("adminId")}}
				,{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
				.then(()=>{
					alert("member add success!");
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
