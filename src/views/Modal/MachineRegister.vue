<template>
	<div id="standard2">
		Register New Machine
		<select class="form-select" id="specificSizeSelect" v-model="memId">
			<option v-for="member in memList" :key="member.memId" :value="member.memId">{{member.memId}}</option>
		</select>
		<input type="text" placeholder="mchId" v-model='mchId'>
		<input type="text" placeholder="description" v-model='description'>
		<input type="text" placeholder="type" v-model='type'>
		<button @click="checkRank">register</button>
	</div>
</template>

<script>
import axios from 'axios'
import EventBus from '../../store/Eventbus'
export default {
	mounted(){
		axios.get(`${this.$store.state.BACK_SERVER}/getMemberList`, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
		.then((res)=>{
			this.memList = res.data;
			this.memId = res.data[0].memId;
		})
	},
	data() {
		return {
			memList: null,
			vendorId: this.$cookies.get('vendorId'),
			memId:null,
			mchId:null,
			description:null,
			type:null
		};
	},
	methods: {
        checkRank() {
			axios.post(`${this.$store.state.BACK_SERVER}/getMember`, {"memId": this.memId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
			.then((res)=>{
				let memRank = res.data.memRank;
				axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId": this.memId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
				.then((res)=>{
					if((res.data.length < 3 && memRank == 'basic') || memRank != 'basic'){
						this.register();
					} else {
						alert("basic grade can't register more than 3 machines");
						EventBus.$emit("modal",false);
					}
				})
			})
        },
		register(){
			let body = {};
			body["mchId"] = this.mchId;
			body["description"] = this.description;
			body["type"] = this.type;
			body["memId"] = {"memId" : this.memId};
			body["vendorId"] = {"vendorId": this.$cookies.get("vendorId")};
			//backend server로 새로운 machine 추가 요청
			axios.post(`${this.$store.state.BACK_SERVER}/insertMachine`, body, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
			.then(()=>{
				alert("machine add success!");
				//MachineRegister modal을 가림
				EventBus.$emit("modal",false);
			})
			.catch(()=>{
				alert('machine add failed please check your mchId');
			})
		}
	},
};
</script>
