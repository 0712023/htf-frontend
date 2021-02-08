<template>
    <button @click="logout">logout</button>
</template>

<script>
import Eventbus from '../store/Eventbus'
export default {
    methods:{
        logout:function() {
            //모든 쿠키를 지움
            this.$cookie.delete("accesstoken");
            this.$cookie.delete("memId");
            this.$cookie.delete("adminId");
            this.$cookie.delete("sensors");
            this.$cookie.delete("members");
            Eventbus.$emit('login', false);
            this.$router.push('/');
        }
    }
}
</script>