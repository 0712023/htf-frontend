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
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.$store.state.RESTAPIKEY);
        params.append('redirect_uri', this.$store.state.MEMBER_REDIRECT_URI);
        params.append('code', this.$route.query.code);
        params.append('client_secret', this.$store.state.CLIENT_SECRET);
        axios.post(`https://kauth.kakao.com/oauth/token`, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res)=>{
            axios.post(`${this.$store.state.BACK_SERVER}/updateMemberToken`, {memId:this.$cookie.get("memId"), kakaoToken:res.data.access_token}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then((res)=>{
                this.$cookie.set("kakaoToken", res.data, 1);
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