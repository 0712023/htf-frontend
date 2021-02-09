<template>
    <div id="standard">
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {memberList:[]}
    },
    mounted() {
      axios.post(`http://studioj.ddns.net/getMemberListByAdId`,{"adId":this.$cookie.get("adminId")},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then((res)=>{
                console.log({manager:res.data});
                this.memberList = this.memberList.concat(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    },
}
</script>