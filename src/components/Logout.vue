<template>
    <button v-if="login"><router-link @click.native="hidemenu" to="/">logout</router-link></button>
</template>

<script>
import store from '../store/store'
export default {
    computed: {
        login() {
            return store.state.login
        }
    },
    methods:{
        hidemenu() {
            store.state.login = false;
        }
    }
}
</script>