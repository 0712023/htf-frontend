<template>
    <div>
        <div style="width: 40vw; float:left; left:0">
            카카오를 이용해 알림을 전달드리고 있습니다. 가입하지 않으신 분에 한해 이 버튼이 나타나니 꼭 가입해주시면 감사하겠습니다
        </div>
        <button @click="getKakaoToken" style="float: right;">카카오 토큰 가입하기!</button>
    </div>
</template>

<script>
export default {
    methods:{
        getKakaoToken(){
            //카카오톡 Message 수신 동의 페이지로 redirect
            alert(this.$cookies.get('adminId'));
            if(this.$cookies.get('adminId')){
                location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${this.$store.state.RESTAPIKEY}&redirect_uri=${this.$store.state.ADMIN_REDIRECT_URI}&response_type=code&scope=friends`;
            }else{
                location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${this.$store.state.RESTAPIKEY}&redirect_uri=${this.$store.state.MEMBER_REDIRECT_URI}&response_type=code&scope=friends`;
            }
        },
    },
}
</script>