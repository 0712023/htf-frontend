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
        //처음엔 AdminRegister modal을 숨김
        EventBus.$on('modal',()=>this.$modal.hide('AdminRegister'));
    },
    methods:{
        modalshow(){
            //AdminRegister modal을 띄움
            this.$modal.show('AdminRegister')
        },
        adminLogin() {
            //backend server로 로그인 요청
            axios.post(`${this.$store.state.BACK_SERVER}/loginAdmin`, {"adId": this.id, "adPw":this.pw})
            .then(res => {
                //반환 데이터가 없을 경우 로그인 실패
                if (res.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //로그인 성공시 쿠키에 access token를 넣어줌
                    this.$cookies.set("accesstoken", res.data);
                }
                axios.post(`${this.$store.state.BACK_SERVER}/getMemberListByAdId`, {"adId": this.id}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
                .then((response) =>{
                    //로그인 정보 및 memberList 데이터 쿠키에 저장
                    this.$cookies.set("adminId", this.id);
                    this.$cookies.set("login", "login");
                    console.log(response.data[0]['adId']);
                    this.$cookies.set("kakaoToken",response.data[0]['adId']['kakaoToken'] || 'null')
                    //사이드바 및 로그아웃 버튼 활성화
                    EventBus.$emit('login', true);
                    EventBus.$emit('admin', true);
                    //admin페이지로 이동
                    this.$router.push('admin/'+this.id);
                })
            })
        }
    }
}
</script>
