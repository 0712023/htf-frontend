<template>
    <button @click="logout">logout</button>
</template>

<script>
import Eventbus from '../store/Eventbus'
export default {
    methods:{
        logout:function() {
            //모든 쿠키를 지움
            this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
            Eventbus.$emit('login', false);
            Eventbus.$emit('member', false);
            Eventbus.$emit('admin', false);
            Eventbus.$emit('vendor', false);
            this.$router.push('/');
        }
    }
}
</script>
