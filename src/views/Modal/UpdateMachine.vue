<template>
    <div id="standard2">
        Machine Id : {{mchIdProps}}
        <br><br>
        New Description <br>
        <input type="text" v-model="newDescription">
        <button @click="UpdateMachine">수정 완료</button>
    </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../store/Eventbus";
export default {
    data(){
        return {
            newDescription: this.desc,
        }
    },
    props:{desc : String, mchIdProps : String},
    methods:{
        UpdateMachine() {
            axios.post(`http://studioj.ddns.net/updateMachine`,{ mchId: this.mchIdProps , description: this.newDescription, memId:{memId:this.$cookie.get("memId")} },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then(() => {
            alert("description update success!");
            EventBus.$emit("modal", false);
            })
            .catch(function (error) {
            console.log(error);
            });
        },
    }
}
</script>