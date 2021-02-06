<template>
    <div id="test">
        this is home <br>
        <input type="text" placeholder="id" id="search" v-model='id'>
        <input type="password" placeholder="pw" id="search" v-model='pw'> <br>
        <button @click="login">login</button>
        <br> <br> <br>
        <button><router-link @click.native="showmenu" to="/user">User</router-link></button>
        <button><router-link @click.native="showmenu" to="/admin">Admin</router-link></button>
        <!-- 로그인하는 form -->
    </div>
</template>

<script>
import store from '../store/store'
import axios from 'axios'
export default {
    data () {
        return {
            id: '',
            pw: ''
        }
    },
    methods:{
        login() {
            store.state.login = true;
            //Axios로 로그인 요청을 함
            axios.post(`http://192.168.168.156:80/login`,{"memId":this.id,"memPw":this.pw})
            .then(response =>{
                console.log(response.data);
                //쿠키에 response.data를 넣어줌
                /*
                axios.post( 여기다가 mchid랑(얘는 꼭 받아와야함. 받아와서 VuexStore에다가 넣어줘야함)
                 userid를 받아오는(안받아와도됨 외냐면 this.id에 아이디값 있긴함) post(또는 get)을 받아옴)
                .then(resonse=>{
                    //가져온 mchid랑 userid를 갖고 페이지를 이동시키는 방법이 어딘가 있을꺼임
                })
                */
            })
        }
    }
}
</script>

<style>
 @import '../assets/css/style.css';
</style>
