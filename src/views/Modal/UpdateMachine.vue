<template>
    <div id="standard2">
        Machine Id : {{mchIdProps}}
        <br>
        New Description <input type="text" v-model="newDescription">
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
            axios.post(`${this.$store.state.BACK_SERVER}/updateMachine`,{mchId: this.mchIdProps, description: this.newDescription, memId:{memId:this.$cookies.get("memId")}})
            .then(() => {
                alert("description update success!");
                EventBus.$emit("modal", false);
            })
        },
    }
}
</script>