<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            RESTAPIKEY:'2de887fb3941336bf23b2d3a76d82991',
            REDIRECT_URI:'http://192.168.168.162:8080/kakaoLogin', //백에서 token 컬럼 update하는 url로 보내면 됨
        }
    },
    mounted:function(){
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.RESTAPIKEY);
        params.append('redirect_uri', this.REDIRECT_URI);
        params.append('code', this.$route.query.code);
        params.append('client_secret', '1yEGMIcIASa5ceBAo5ZZzh1Zld4R2fmO');
        axios.post(`https://kauth.kakao.com/oauth/token`, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>