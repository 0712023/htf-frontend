<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios'
import EventBus from '../store/Eventbus'
export default {
    data(){
        return {
            RESTAPIKEY:'2de887fb3941336bf23b2d3a76d82991',
            REDIRECT_URI:'http://localhost:8080/kakaoLogin', //front server
        }
    },
    mounted:function(){
        console.log({"Authorization code":this.$route.query.code})
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.RESTAPIKEY);
        params.append('redirect_uri', this.REDIRECT_URI);
        params.append('code', this.$route.query.code);
        params.append('client_secret', '1yEGMIcIASa5ceBAo5ZZzh1Zld4R2fmO');
        axios.post(`https://kauth.kakao.com/oauth/token`, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res)=>{
            console.log({"access_token":res.data.access_token})
            axios.post(`http://studioj.ddns.net/updateMemberToken`, {memId:this.$cookie.get("memId"), kakaoToken:res.data.access_token}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then(()=>{
                EventBus.$emit("kakao", null)
                this.$router.push('/');
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>