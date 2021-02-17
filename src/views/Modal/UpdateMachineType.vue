<template>
    <div id="standard2">
        Machine Id : {{mchIdProps}}
        <br><br>
        New Type : <span><input type="text" v-model="newType"></span>
        <button @click="updateMachineType">수정 완료</button>
    </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../store/Eventbus";
export default {
    data(){
        return {
            newType: this.type,
        }
    },
    props:{type : String, mchIdProps : String},
    methods:{
        updateMachineType() {
            axios.post(`${this.$store.state.BACK_SERVER}/updateMachineType`,{ mchId: this.mchIdProps , type: this.newType},{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then(() => {
                alert("type update success!");
                EventBus.$emit("modal", false);
            })
        },
    }
}
</script>