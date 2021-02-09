<template>
    <div id="standard">
        Member List
        <table border="1" width="1000">
            <thead> 
            <tr>
                <th width="500" v-for="(val, key) in memberList[0]" :key="key">{{key}}</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="member in memberList" :key="member.memId">
                    <td width="500" v-for="(val, key) in member" :key="key">{{val}}</td>
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
import Register from './Register'
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