<template>
    <div>
        <input type="text" placeholder="member id" v-model='id' class="login-input-wrap input-id">
        <input type="password" placeholder="pw" v-model='pw' class="login-input-wrap input-id"><br><br>
        <button @click="memberLogin">login</button> 
        <button @click="test">테스트</button>
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
        test(){
            let body = {
                "cid":"TC0ONETIME",
                "partner_order_id":"0000",
                "partner_user_id":"sh",
                "tid":"T2863458360269535682",
                "pg_token":"ccf070c1d068a90557da"
            }
            axios.post(`https://kapi.kakao.com/v1/payment/approve`, body, {headers: { Authorization: `KakaoAK 8fe7fc4a9f57b22dc5a4a209121cb7f5`}})
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        memberLogin() {
            axios.post(`http://studioj.ddns.net/loginMember`, {"memId":this.id,"memPw":this.pw})
            .then(res => {
                if (res.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //쿠키에 access token를 넣어줌
                    this.$cookie.set("accesstoken", res.data["htfToken"], 1);
                    this.$cookie.set("kakaoToken", res.data["kakaoToken"], 1);
                    this.$cookie.set("memRank", res.data["memRank"], 1);
                   EventBus.$emit("kakao", res.data["kakaoToken"]);
                }

                //유저가 로그인을 시도하는 경우
                axios.defaults.headers.common["x-access-token"] = res.data;
                axios.post(`http://studioj.ddns.net/getMachineListByMemId`, {"memId": this.id},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
                .then(res =>{
                    //로그인 정보 및 센서 데이터 쿠키에 저장
                    this.$cookie.set("memId", this.id, 1);
                    this.$cookie.set("login", "login", 1);
                    this.$cookie.set("mchList", JSON.stringify(res.data), 1);
                    
                    //사이드바 및 로그아웃 버튼 활성화
                    EventBus.$emit('login', true);
                    EventBus.$emit('member', true);
                    EventBus.$emit('mchList', res.data);
                    this.$router.push('member/'+this.id);
                })
            }).catch(function(error){
                console.log(error)
            })
        },
    }
}
</script>
