<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted:function(){
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.$store.state.RESTAPIKEY);
        params.append('redirect_uri', this.$store.state.ADMIN_REDIRECT_URI);
        params.append('code', this.$route.query.code);
        params.append('client_secret', this.$store.state.CLIENT_SECRET);
        axios.post(`https://kauth.kakao.com/oauth/token`, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res)=>{
            axios.post(`${this.$store.state.BACK_SERVER}/updateAdminToken`, {adId:this.$cookie.get("adId"), kakaoToken:res.data.access_token}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then(()=>{
                this.$cookie.delete("accesstoken");
                this.$cookie.delete("adId");
                this.$router.push("/");
            })
        })
    }
}
</script>