<template>
    <div id="test">
        this is home <br>
        <button><router-link @click.native="showmenu" to="/user">User</router-link></button>
        <button><router-link @click.native="showmenu" to="/admin">Admin</router-link></button>
    </div>
</template>

<script>
import store from '../store/store'
export default {
    methods:{
        showmenu() {
            store.state.login = true;
        }
    }
}
</script>

<style>
 @import '../assets/css/style.css';
</style>
