<template>
    <div id="standard">
        <!-- 로그인하는 form -->
        <input type="text" placeholder="admin id" v-model='id'>
        <input type="password" placeholder="pw" v-model='pw'>
        <button @click="adminLogin">login</button>
        <button @click="modalshow">Register</button>
        <modal name="AdminRegister"><AdminRegister/></modal>
    </div>
</template>

<script>
import AdminRegister from '../Modal/AdminRegister';
import axios from 'axios';
import EventBus from '../../store/Eventbus';
export default {
    mounted () {
        this.$modal.hide('AdminRegister')
    },
    data () {
        return {
            id: '',
            pw: '',
        }
    },
    components:{
        AdminRegister
    },
    created:function(){
        EventBus.$on('modal',()=>this.$modal.hide('AdminRegister'));
    },
    methods:{
        modalshow(){
            this.$modal.show('AdminRegister')
        },
        adminLogin() {
            axios.post(`http://studioj.ddns.net/loginAdmin`, {"adId": this.id, "adPw":this.pw})
            .then(res => {
                if (res.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //쿠키에 access token를 넣어줌
                    this.$cookie.set("accesstoken", res.data, 1);
                }
                //admin id로 모든 멤버 아이디 불러오기
                axios.post(`http://studioj.ddns.net/getMemberListByAdId`, {"adId": this.id}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
                .then(res =>{
                    //로그인 정보 및 센서 데이터 쿠키에 저장
                    console.log(res.data);
                    this.$cookie.set("adminId", this.id, 1);
                    this.$cookie.set("login", "login", 1);
                    this.$cookie.set("members", JSON.stringify(res.data), 1);
                    //사이드바 및 로그아웃 버튼 활성화
                    EventBus.$emit('login', true);
                    EventBus.$emit('admin', true);
                    EventBus.$emit('members', res.data);
                    this.$router.push('admin/'+this.id);
                })
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>
