<template>
    <div id="test">
        this is home <br><br><br>
        <!-- 로그인하는 form -->
        <input type="text" placeholder="id" v-model='id'>
        <input type="password" placeholder="pw" v-model='pw'> <br>
        <button @click="login">login</button><button>sign in</button>
    </div>
</template>

<script>
import axios from 'axios'
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
                //쿠키에 response.data를 넣어줌
                this.$cookie.set("accesstoken", response.data, 1);
                axios.defaults.headers.common["x-access-token"] = response.data;
            }).then(()=>{
                //로그인시 기본으로 자료를 받으러 다녀옴
                    axios.post(`http://studioj.ddns.net/getMachineListByMemId`, {"memId": this.id}, 
                            {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
                    ).then(response =>{
                        //사이드바 및 로그아웃 버튼 활성화
                        this.$cookie.set("loginStatus", true, 1);
                        this.$cookie.set("userId", this.id, 1);
                        this.$cookie.set("sensors", JSON.stringify(response.data), 1);
                    }).then(()=>{
                        this.$router.push('user/'+this.id);
                    })
                }
            )
        }
    }
}
</script>

<style>
 @import '../assets/css/style.css';
</style>
