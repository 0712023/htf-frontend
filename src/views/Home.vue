<template>
    <div id="test">
        this is home <br><br><br>
        <!-- 로그인하는 form -->
        <input type="text" placeholder="id" v-model='id'>
        <input type="password" placeholder="pw" v-model='pw'>
        <button @click="login">login</button> <br>
        <button>sign in</button>
    </div>
</template>

<script>
import axios from 'axios'
import EventBus from '../store/Eventbus'
export default {
    data () {
        return {
            id: '',
            pw: ''
        }
    },
    methods:{
        login() {
            //Axios로 로그인 요청을 함
            axios.post(`http://studioj.ddns.net/login`, {"memId":this.id,"memPw":this.pw})
            .then(response =>{
                if (response.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                }
                //쿠키에 access token를 넣어줌
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
