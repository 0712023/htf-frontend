<template>
    <div>
        <input type="text" placeholder="vendor id" v-model='id' class="login-input-wrap input-id">
        <input type="password" placeholder="pw" v-model='pw' class="login-input-wrap input-id"><br><br>
        <button @click="vendorLogin">login</button>
    </div>
</template>

<script>
import axios from 'axios';
import EventBus from '../../store/Eventbus';
export default {
    data () {
        return {
            id: '',
            pw: '',
        }
    },
    methods:{
        vendorLogin() {
            axios.post(`${this.$store.state.BACK_SERVER}/loginVendor`, {"vendorId":this.id,"vendorPw":this.pw})
            .then(res => {
                if (res.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //쿠키에 access token를 넣어줌
                    this.$cookie.set("accesstoken", res.data, 1);
                }
                axios.defaults.headers.common["x-access-token"] = res.data;
                axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByVendorId`, {"vendorId": this.id}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
                .then(res =>{
                    //로그인 정보 및 센서 데이터 쿠키에 저장
                    this.$cookie.set("vendorId", this.id, 1);
                    this.$cookie.set("login", "login", 1);
                    this.$cookie.set("mchList", JSON.stringify(res.data), 1);
                    //사이드바 및 로그아웃 버튼 활성화
                    EventBus.$emit('login', true);
                    EventBus.$emit('mchList', res.data);
                    EventBus.$emit('vendor', true);
                    this.$router.push('vendor/'+this.id);
                })
            })
        },
    }
}
</script>
