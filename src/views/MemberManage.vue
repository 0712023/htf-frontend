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
                    {{index + 1}}
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
import MemberRegister from './Modal/MemberRegister'
import EventBus from '../store/Eventbus'
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
        EventBus.$on('modal',()=>{this.$modal.hide('MemberRegister');this.getMemberList();});
    },
    methods:{
        modalshow(){
            this.$modal.show('MemberRegister');
        },
        getMemberList(){
            axios.post(`${this.$store.state.BACK_SERVER}/getMemberListByAdId`,{"adId":this.$cookie.get("adminId")})
            .then((res)=>{
                this.memberList = res.data;
            })
        }
    }
}
</script>