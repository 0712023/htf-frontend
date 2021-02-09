<template>
    <div id="standard2">
        {{desc}}
        New Description <br> <br>
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
    props:['desc'],
    methods:{
        UpdateMachine() {
            console.log(this.id);
            console.log(this.$cookie.get("accesstoken"));
            axios.post(`http://studioj.ddns.net/updateMachine`,{ mchId: this.id, description: this.newDescription },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
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