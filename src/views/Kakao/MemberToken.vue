<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios'
import EventBus from '../../store/Eventbus'
export default {
    mounted:function(){
        //카카오 토큰 획득 위한 parameter 설정
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.$store.state.RESTAPIKEY);
        params.append('redirect_uri', this.$store.state.MEMBER_REDIRECT_URI);
        params.append('code', this.$route.query.code);
        params.append('client_secret', this.$store.state.CLIENT_SECRET);
        axios.post(`https://kauth.kakao.com/oauth/token`, params)
        .then((res)=>{
            //반환받은 카카오 토큰 정보를 다시 포장하여 backend의 member DB의 token을 update
            axios.post(`${this.$store.state.BACK_SERVER}/updateMemberToken`, {memId:this.$cookies.get("memId"), kakaoToken:res.data.access_token})
            .then((res)=>{
                //쿠키에 kakaoToken 설정함으로써 카카오토큰 가입하라는 배너를 보이지 않게 함
                this.$cookies.set("kakaoToken", res.data);
                EventBus.$emit("kakao", null);
                //'login'페이지로 이동 -> 자동으로 member 페이지로 이동(쿠키에 memId가 있으므로 router.js에서 자동으로 이동시킴)
                this.$router.push('/');
            })
        })
    }
}
</script>