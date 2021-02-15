<template>
    <div>
        <button @click="getKakaoToken">카카오 토큰 가입하기!</button>
    </div>
</template>

<script>
export default {
    methods:{
        getKakaoToken(){
            location.href='https://kauth.kakao.com/oauth/authorize?client_id='+this.$store.state.RESTAPIKEY+'&redirect_uri='+this.$store.state.MEMBER_REDIRECT_URI+'&response_type=code&scope=friends'
        },
    },
}
</script>