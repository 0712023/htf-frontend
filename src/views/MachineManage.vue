<template>
    <div id="standard">
        Machine List
        <table border="1" width="1000">
            <thead> 
            <tr><!--template 쓰는 이유 : v-for 이후에 th에서 v-if사용하기 위해서 -->
                <template v-for="(val, key) in mchList[0]">
                    <th width="500" :key="key" v-if="key!='memId'" >{{key}}</th>
                </template>
                <th>update type</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="machine in mchList" :key="machine.mchId">
                    <template v-for="(val, key) in machine" >
                        <td :key="key" v-if="key!='memId' && key!='vendorId'">{{val}}</td>
                        <td :key="key" v-if="key=='vendorId'">{{val.vendorId}}</td>
                    </template>
                    <td><button @click="updateMachineType(machine.type, machine.mchId)">update</button></td>
                </tr>
            </tbody>
        </table> 
        <br>
        <button @click="modalshow">Add</button>
        <modal name="MachineRegister"><MachineRegister/></modal>
        <modal name="UpdateMachineType"><UpdateMachineType :type.sync="type" :mchIdProps.sync="mchId"/></modal>
    </div>
</template>

<script>
import axios from 'axios'
import MachineRegister from './Modal/MachineRegister'
import UpdateMachineType from './Modal/UpdateMachineType'
import EventBus from '../store/Eventbus'
export default {
    data(){
        return {mchList:[], type:'',mchId:''}
    },
    components:{
        MachineRegister,UpdateMachineType
    },
    mounted() {
        this.$modal.hide('MachineRegister');
        this.getMachineList();
    },
    created:function(){
        EventBus.$on('modal',()=>{this.$modal.hide('MachineRegister');this.getMachineList();});
    },
    methods:{
        modalshow(){
            this.$modal.show('MachineRegister')
        },
        getMachineList(){
            axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByVendorId`,{"vendorId":this.$cookie.get("vendorId")},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
            .then((res)=>{
                this.mchList = res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        updateMachineType(type,mchIdInPut) {
            this.mchId = mchIdInPut;
            this.type = type;
            this.$modal.show("UpdateMachineType", {"type":type});
        },
    }
}
</script>