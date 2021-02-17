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
    props:{mchIdProps : String, type : String},
    methods:{
        updateMachineType() {
            //backend server로 machine DB의 type을 props로 전달받은 type으로 update
            axios.post(`${this.$store.state.BACK_SERVER}/updateMachineType`,{mchId: this.mchIdProps, type: this.newType})
            .then(() => {
                alert("type update success!");
                //UpdateMachineType modal을 가림
                EventBus.$emit("modal", false);
            })
        },
    }
}
</script>