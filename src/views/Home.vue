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
import Register from './Modal/Register';
import axios from 'axios';
import EventBus from '../store/Eventbus';
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
                return "Member";
            }
        },
        login() {
            //Axios로 로그인 요청을 함
            console.log(this.returnAdminLetter());
            if(this.adminLogin) {
                this.adminLoginMethod();
            } else {
                this.memberLoginMethod();
            }
        },
        memberLoginMethod() {
            axios.post(`http://studioj.ddns.net/loginMember`, {"memId":this.id,"memPw":this.pw})
            .then(response => {
                if (response.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //쿠키에 access token를 넣어줌
                    this.$cookie.set("accesstoken", response.data, 1);
                }

                //유저가 로그인을 시도하는 경우
                axios.defaults.headers.common["x-access-token"] = response.data;
                axios.post(`http://studioj.ddns.net/getMachineListByMemId`, {"memId": this.id}, 
                        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
                    ).then(response =>{
                        //로그인 정보 및 센서 데이터 쿠키에 저장
                        this.$cookie.set("memId", this.id, 1);
                        this.$cookie.set("login", "login", 1);
                        this.$cookie.set("mchList", JSON.stringify(response.data), 1);
                        //사이드바 및 로그아웃 버튼 활성화
                        EventBus.$emit('login', true);
                        EventBus.$emit('member', true);
                        EventBus.$emit('mchList', response.data);
                        this.$router.push('member/'+this.id);
                })
            }).catch(function(error){
                console.log(error)
            })
        },
        adminLoginMethod() {
            axios.post(`http://studioj.ddns.net/loginAdmin`, {"adId": this.id, "adPw":this.pw})
            .then(response => {
                if (response.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //쿠키에 access token를 넣어줌
                    this.$cookie.set("accesstoken", response.data, 1);
                }
                //admin id로 모든 멤버 아이디 불러오기
                axios.post(`http://studioj.ddns.net/getMemberListByAdId`, {"adId": this.id}, 
                        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
                    ).then(response =>{
                        //로그인 정보 및 센서 데이터 쿠키에 저장
                        console.log(response.data);
                        this.$cookie.set("adminId", this.id, 1);
                        this.$cookie.set("login", "login", 1);
                        this.$cookie.set("members", JSON.stringify(response.data), 1);
                        //사이드바 및 로그아웃 버튼 활성화
                        EventBus.$emit('login', true);
                        EventBus.$emit('admin', true);
                        EventBus.$emit('members', response.data);
                        this.$router.push('admin/'+this.id);
                })
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
