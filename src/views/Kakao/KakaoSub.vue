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
        axios.post(`${this.$store.state.BACK_SERVER}/kakaoSub`, {"pg_token":this.$route.query.pg_token}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then((res)=>{
            //쿠키에 memRank를 요청한 rank로 설정
            this.$cookies.set("memRank", res.data);
            this.$router.push("/");
        })
    }
}
</script>