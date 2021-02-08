<template>
    <div id="standard">
        <!-- 로그인하는 form -->
        Admin Login : <input type="checkbox" v-model="adminLogin">
        <input type="text" placeholder="id" v-model='id'>
        <input type="password" placeholder="pw" v-model='pw'>
        <button @click="login">login</button>
        <button @click="modalshow">Register</button>
        <modal name="register"><Register/></modal>
    </div>
</template>

<script>
import Register from './Register';
import axios from 'axios'
import EventBus from '../store/Eventbus'
export default {
    mounted () {
        this.$modal.hide('register')
    },
    data () {
        return {
            id: '',
            pw: '',
            adminLogin: false,
        }
    },
    components:{
        Register
    },
    created:function(){
        EventBus.$on('modal',()=>this.$modal.hide('register'));
    },
    methods:{
        modalshow(){
            this.$modal.show('register')
        },
        returnAdminLetter() {
            if (this.adminLogin) {
                return "Admin";
            } else {
                return "";
            }
        },
        login() {
            //Axios로 로그인 요청을 함
            console.log(this.returnAdminLetter());
            axios.post(`http://studioj.ddns.net/login` + this.returnAdminLetter(), {"memId":this.id,"memPw":this.pw})
            .then(response => {
                if (response.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                }
                //쿠키에 access token를 넣어줌
                if (this.adminLogin) {
                    //admin id로 모든 멤버 아이디 불러오기

                    this.$router.push('admin/'+this.id);
                } else {
                //유저가 로그인을 시도하는 경우
                    this.$cookie.set("accesstoken", response.data, 1);
                    axios.defaults.headers.common["x-access-token"] = response.data;
                    axios.post(`http://studioj.ddns.net/getMachineListByMemId`, {"memId": this.id}, 
                            {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
                        ).then(response =>{
                            //로그인 정보 및 센서 데이터 쿠키에 저장
                            this.$cookie.set("userId", this.id, 1);
                            this.$cookie.set("sensors", JSON.stringify(response.data), 1);
                            //사이드바 및 로그아웃 버튼 활성화
                            EventBus.$emit('login', true);
                            EventBus.$emit('sensors', response.data);
                            this.$router.push('user/'+this.id);
                    })
                }
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>

<style>
 @import '../assets/css/style.css';
</style>
