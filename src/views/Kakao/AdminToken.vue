<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted:function(){
        //카카오 토큰 획득 위한 parameter 설정
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.$store.state.RESTAPIKEY);
        params.append('redirect_uri', this.$store.state.ADMIN_REDIRECT_URI);
        params.append('code', this.$route.query.code);
        params.append('client_secret', this.$store.state.CLIENT_SECRET);
        axios.post(`https://kauth.kakao.com/oauth/token`, params)
        .then((res)=>{
            //반환받은 카카오 토큰 정보를 다시 포장하여 backend의 admin DB의 token을 update
            axios.post(`${this.$store.state.BACK_SERVER}/updateAdminToken`, {adId:this.$cookies.get("adId"), kakaoToken:res.data.access_token}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
            .then(()=>{
                //admin 카카오 토큰 저장 후 쿠키 삭제
                this.$cookies.remove("accesstoken");
                this.$cookies.remove("adId");
                //'login' 페이지로 이동
                this.$router.push("/");
            })
        })
    }
}
</script>