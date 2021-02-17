<template>
    <div>
        <!-- 로그인하는 form -->
        <input type="text" placeholder="admin id" v-model='id' class="login-input-wrap input-id">
        <input type="password" placeholder="pw" v-model='pw' class="login-input-wrap input-id"><br><br>
        <button @click="adminLogin">login</button><br><br><br>
        <div class="login-top-wrap">
            <span>Don't have an account?</span>
            <button @click="modalshow" class="create-account-btn shadow-light">Register</button>
        </div>
        <modal name="AdminRegister"><AdminRegister/></modal>
    </div>
</template>

<script>
import AdminRegister from '../Modal/AdminRegister';
import axios from 'axios';
import EventBus from '../../store/Eventbus';
export default {
    mounted () {
        this.$modal.hide('AdminRegister')
    },
    data () {
        return {
            id: '',
            pw: '',
        }
    },
    components:{
        AdminRegister
    },
    created:function(){
        EventBus.$on('modal',()=>this.$modal.hide('AdminRegister'));
    },
    methods:{
        modalshow(){
            this.$modal.show('AdminRegister')
        },
        adminLogin() {
            axios.post(`${this.$store.state.BACK_SERVER}/loginAdmin`, {"adId": this.id, "adPw":this.pw})
            .then(res => {
                if (res.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //쿠키에 access token를 넣어줌
                    this.$cookie.set("accesstoken", res.data, 1);
                }
                //admin id로 모든 멤버 아이디 불러오기
                axios.post(`${this.$store.state.BACK_SERVER}/getMemberListByAdId`, {"adId": this.id}, {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
                .then(res =>{
                    //로그인 정보 및 센서 데이터 쿠키에 저장
                    this.$cookie.set("adminId", this.id, 1);
                    this.$cookie.set("login", "login", 1);
                    this.$cookie.set("members", JSON.stringify(res.data), 1);
                    //사이드바 및 로그아웃 버튼 활성화
                    EventBus.$emit('login', true);
                    EventBus.$emit('admin', true);
                    EventBus.$emit('members', res.data);
                    this.$router.push('admin/'+this.id);
                })
            })
        }
    }
}
</script>
