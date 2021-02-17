<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted:function(){
        //backend server로 정기구독 요청
        axios.post(`${this.$store.state.BACK_SERVER}/kakaoSub`, {"tid":this.$cookies.get("tid"),"pg_token":this.$route.query.pg_token, "memId":this.$cookies.get("memId")})
        .then(()=>{
            this.$cookies.remove("tid");
            window.close();
        })
    }
}
</script>