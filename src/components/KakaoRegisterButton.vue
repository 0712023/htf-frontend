<template>
    <div>
        <div style="width: 40vw; float:left; left:0; font-weight: bold; font-size:150%; text-align:center; color:red;">
            If you are seeing this, you didn't sign up for kakao alarm service yet.<br>Please click button and be alerted!
        </div>
        <button @click="getKakaoToken" style="float: right;">Kakao!</button>
    </div>
</template>

<script>
export default {
    methods:{
        getKakaoToken(){
            //카카오톡 Message 수신 동의 페이지로 redirect
            if(this.$cookies.get('adminId')){
                location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${this.$store.state.RESTAPIKEY}&redirect_uri=${this.$store.state.ADMIN_REDIRECT_URI}&response_type=code&scope=friends,talk_message`;
            }else{
                location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${this.$store.state.RESTAPIKEY}&redirect_uri=${this.$store.state.MEMBER_REDIRECT_URI}&response_type=code&scope=friends`;
            }
        },
    },
}
</script>