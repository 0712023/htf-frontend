<template>
    <div id="standard">
        please wait a moments...
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted:function(){
        axios.post(`${this.$store.state.BACK_SERVER}/kakaoSub`, {"tid":this.$cookie.get("tid"),"pg_token":this.$route.query.pg_token, "memId":this.$cookie.get("memId")}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
        .then(()=>{
            this.$cookie.delete("tid");
            window.close();
        })
    }
}
</script>