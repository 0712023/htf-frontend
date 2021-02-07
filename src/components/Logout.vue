<template>
    <button v-if="login" @click="logout">logout</button>
</template>

<script>
export default {
    computed: {
        login() {
            return this.$cookie.get("loginStatus");
        }
    },
    methods:{
        logout:function() {
            //모든 쿠키를 지움
            this.$cookie.delete("accesstoken");
            this.$cookie.delete("loginStatus");
            this.$cookie.delete("userId");
            this.$cookie.delete("sensors");
            this.$router.push('/');
        }
    }
}
</script>