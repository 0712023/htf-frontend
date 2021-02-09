<template>
    <div id="standard2">
        {{desc}}
        {{this.mchId}} : New Description <br> <br>
        <input type="text" v-model="newDescription">
        <button @click="UpdateMachine">수정 완료</button>
    </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../store/Eventbus";
export default {
    data(){
        return {newDescription:""}
    },
    props:['desc', 'mchId'],
    methods:{
        UpdateMachine() {
            console.log(this.id);
            console.log(this.$cookie.get("memId"));
            axios.post(`http://studioj.ddns.net/updateMachine`,{ mchId:this.mchId , description: this.newDescription, memId:{memId:this.$cookie.get("memId")} },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then((response) => {
            alert("register success!");
            console.log(response.data);
            EventBus.$emit("modal", false);
            })
            .catch(function (error) {
            console.log(error);
            });
        },
    }
}
</script>