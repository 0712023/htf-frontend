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
            //사이드바 및 로그아웃 버튼 비활성화
            store.state.login = false;
            //토큰을 지움
            this.$cookie.delete("accesstoken");
            //VuexStore에 userId를 지움
            store.state.userId = null;
        }
    }
}
</script>