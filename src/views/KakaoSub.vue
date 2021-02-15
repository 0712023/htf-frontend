<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted:function(){
        let tid = this.$cookie.get("tid");
        axios.post(`http://192.168.168.156:80/kakaoSub`, {"tid":tid,"pg_token":this.$route.query.pg_token, "memId":this.$cookie.get("memId")}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
        .then((res)=>{
            console.log(res.data);
            this.$cookie.set("sid", res.data, 1);
            window.close();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}
</script>