<template>
	<div id="standard2"><br>
		Register New Machine
		<input type="text" placeholder="mchId" v-model='mchId'>
        <input type="text" v-model='vendorId' readonly><br>
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
			vendorId: this.$cookies.get('vendorId')
		};
	},
	methods: {
        register() {
			//backend server로 새로운 machine 추가 요청
			axios.post(`${this.$store.state.BACK_SERVER}/insertMachine`, {"mchId":this.mchId,"vendorId":{"vendorId": this.$cookies.get("vendorId")}})
			.then(()=>{
				alert("machine add success!");
				//MachineRegister modal을 가림
				EventBus.$emit("modal",false);
			})
			.catch(()=>{
				alert('machine add failed please check your mchId');
			})
        },
	},
};
</script>
