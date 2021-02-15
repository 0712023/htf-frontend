<template>
    <div>
        <button @click="getKakaoToken">카카오 토큰 가입하기!</button>
    </div>
</template>

<script>
export default {
    methods:{
        getKakaoToken(){
            location.href='https://kauth.kakao.com/oauth/authorize?client_id='+this.RESTAPIKEY+'&redirect_uri='+this.REDIRECT_URI+'&response_type=code&scope=friends'
        },
    },
    data(){
        return {
            RESTAPIKEY:'2de887fb3941336bf23b2d3a76d82991',
            REDIRECT_URI:'http://localhost:8080/memberKakaoToken', //front server
        }   
    }
}
</script>