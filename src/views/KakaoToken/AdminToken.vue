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
            REDIRECT_URI:'http://localhost:8080/adminKakaoToken', //front server
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
            axios.post(`http://studioj.ddns.net/updateAdminToken`, {adId:this.$cookie.get("adId"), kakaoToken:res.data.access_token}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then(()=>{
                this.$cookie.delete("accesstoken");
                this.$router.push("/");
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>