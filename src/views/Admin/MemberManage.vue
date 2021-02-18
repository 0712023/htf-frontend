<template>
    <div id="standard">
        <h2 style="color:black;">Member List</h2>
        <table border="1" width="1000">
            <thead> 
            <tr>
                <th>#</th>
                <template v-for="(val, key) in memberList[0]">
                    <th width="500" :key="key" v-if="key=='memId' || key=='memRank'">{{key}}</th>
                </template>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(member, index) in memberList" :key="member.memId">
                    <td>{{index + 1}}</td>
                    <template v-for="(val, key) in member">
                        <td width="500" :key="key" v-if="key=='memId' || key=='memRank'">{{val}}</td>
                    </template>
                </tr>
            </tbody>
        </table> 
        <br>
        <button @click="modalshow">Add</button>
        <modal name="MemberRegister"><MemberRegister/></modal>
    </div>
</template>

<script>
import axios from 'axios'
import MemberRegister from '../Modal/MemberRegister'
import EventBus from '../../store/Eventbus'
export default {
    data(){
        return {
            memberList:[],
        }
    },
    components:{
        MemberRegister
    },
    mounted() {
        this.$modal.hide('MemberRegister');
        this.getMemberList();
    },
    created:function(){
        //MemberRegister modal이 종료되었을 경우 새로운 member List를 받아옴
        EventBus.$on('modal',()=>{this.$modal.hide('MemberRegister');this.getMemberList();});
    },
    methods:{
        modalshow(){
            this.$modal.show('MemberRegister');
        },
        getMemberList(){
            //backend server에 member List를 요청
            axios.post(`${this.$store.state.BACK_SERVER}/getMemberListByAdId`,{"adId":this.$cookies.get("adminId")})
            .then((res)=>{
                //반환받은 member List를 데이터에 저장
                this.memberList = res.data;
            })
        }
    }
}
</script>