<template>
    <div id="standard">
        Member List
        <table border="1" width="1000">
            <thead> 
            <tr>
                <template v-for="(val, key) in memberList[0]">
                    <th width="500" :key="key" v-if="key=='memId' || key=='memRank'">{{key}}</th>
                </template>
            </tr>
            </thead>
            <tbody>
                <tr v-for="member in memberList" :key="member.memId">
                    <template v-for="(val, key) in member">
                        <td width="500" :key="key" v-if="key=='memId' || key=='memRank'">{{val}}</td>
                    </template>
                </tr>
            </tbody>
        </table> 
        <br>
        <button @click="modalshow">Add Member</button>
        <modal name="register"><Register/></modal>
    </div>
</template>

<script>
import axios from 'axios'
import Register from './Modal/Register'
import EventBus from '../store/Eventbus'
export default {
    data(){
        return {memberList:[]}
    },
    components:{
        Register
    },
    mounted() {
        this.$modal.hide('register');
        this.getMemberList();
    },
    created:function(){
        EventBus.$on('modal',()=>{this.$modal.hide('register');this.getMemberList();});
    },
    methods:{
        modalshow(){
            this.$modal.show('register')
        },
        getMemberList(){
            axios.post(`http://studioj.ddns.net/getMemberListByAdId`,{"adId":this.$cookie.get("adminId")},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then((res)=>{
                console.log({manager:res.data});
                this.memberList = res.data
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>