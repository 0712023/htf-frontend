<template>
    <div>
        <input type="text" placeholder="member id" v-model='id' class="login-input-wrap input-id">
        <input type="password" placeholder="pw" v-model='pw' class="login-input-wrap input-id"><br><br>
        <button @click="memberLogin">login</button> 
    </div>
</template>

<script>
import axios from 'axios';
import EventBus from '../../store/Eventbus';
export default {
    data () {
        return {
            id: '',
            pw: '',
        }
    },
    methods:{
        memberLogin() {
            //backend server로 로그인 요청
            axios.post(`${this.$store.state.BACK_SERVER}/loginMember`, {"memId":this.id,"memPw":this.pw})
            .then(res => {
                //반환 데이터가 없을 경우 로그인 실패
                if (res.data == '') {
                    alert("login failed")
                    throw new Error("login failed")
                } else {
                    //로그인 성공시 쿠키에 access token를 넣어줌
                    this.$cookies.set("accesstoken", res.data["htfToken"]);
                    this.$cookies.set("kakaoToken", res.data["kakaoToken"]);
                    this.$cookies.set("memRank", res.data["memRank"]);
                    // EventBus.$emit("kakao", res.data["kakaoToken"]); //필요없는 것 같은데 일단 주석
                }
                // axios.defaults.headers.common["x-access-token"] = res.data; //필요없는 것 같은데 일단 주석
                //memId로 machineList 불러오기
                axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId": this.id}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
                .then(res =>{
                    //로그인 정보 및 machineList 데이터 쿠키에 저장
                    this.$cookies.set("memId", this.id);
                    this.$cookies.set("login", "login");
                    this.$cookies.set("mchList", JSON.stringify(res.data));
                    
                    //사이드바 및 로그아웃 버튼 활성화
                    EventBus.$emit('login', true);
                    EventBus.$emit('member', true);
                    EventBus.$emit('mchList', res.data);

                    if(this.$cookies.get("memRank") === "null"){
                        //memRank가 존재하지 않을 경우 subscribe 페이지로 이동
                        this.$router.push("/subscribe/");
                    } else {
                        //memRank가 존재할 경우 멤버 페이지로 이동
                        this.$router.push('member/'+this.id);
                    }
                })
            })
        },
    }
}
</script>
