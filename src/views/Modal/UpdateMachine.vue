<template>
    <div id="standard">
        Machine Id : {{mchIdProps}}
        <br>
        New Description <input type="text" v-model="newDescription"><br>
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
    props:{mchIdProps : String, desc : String},
    methods:{
        UpdateMachine() {
            //backend server로 machine DB의 description을 props로 전달받은 desc로 update
                axios.post(`${this.$store.state.BACK_SERVER}/updateMachine`,{mchId: this.mchIdProps, description: this.newDescription, memId:{memId:this.$cookies.get("memId")}}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
                .then(() => {
                    alert("description update success!");
                    //UpdateMachine modal을 가림
                    EventBus.$emit("modal", false);
                })
            
        },
    }
}
</script>