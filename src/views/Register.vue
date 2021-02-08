<template>
	<div class="reg_container">
		<form @submit.prevent="SignupForm">
            <div>
				<label for="reg_id">id : </label>
				<input type="text" id="reg_id" v-model="reg_id" placeholder="Enter your ID" />
                
			</div>
            <div>
				<label for="reg_pw">pw : </label>
				<input type="text" id="reg_pw" v-model="reg_pw" />
			</div>
			<button type="submit">회원가입</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'SignupForm',
	data() {
		return {
            errors: [],
            reg_id: null,
            reg_pw: null,
		};
	},
	methods: {
        checkForm() {
            this.errors = [];
            if( !this.reg_id ){
                this.errors.push("ID error.");
            }
            if( !this.reg_pw ){
                this.errors.push("PW error.");
            }
            if( !this.errors.length ) return true;
        },
        
	},
};
</script>
