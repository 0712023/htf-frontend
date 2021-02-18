<template>
    <div id="standard">     
       <h2>Machine List</h2> <br>
        <table border="1" width="1000">
            <thead> 
            <tr><!--template 쓰는 이유 : v-for 이후에 th에서 v-if사용하기 위해서 -->
                <template v-for="(val, key) in mchList[0]">
                    <th width="300" :key="key" v-if="key!='memId'" >{{key}}</th>
                </template>
                <th width="300">update type</th>
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
import MachineRegister from '../Modal/MachineRegister'
import UpdateMachineType from '../Modal/UpdateMachineType'
import EventBus from '../../store/Eventbus'
export default {
    data(){
        return {
            mchList:[], 
            type:'',
            mchId:'',
        }
    },
    components:{
        MachineRegister,UpdateMachineType
    },
    mounted() {
        this.$modal.hide('MachineRegister');
        this.getMachineList();
    },
    created:function(){
        //MachineRegister modal이 종료되었을 경우 새로운 machineList를 받아옴
        EventBus.$on('modal',()=>{this.$modal.hide('MachineRegister');this.getMachineList();});
    },
    methods:{
        modalshow(){
            //MachineRegister modal을 띄움
            this.$modal.show('MachineRegister')
        },
        getMachineList(){
            //backend server에 vendorId를 가진 모든 machine List를 요청
            axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByVendorId`,{"vendorId":this.$cookies.get("vendorId")})
            .then((res)=>{
                //반환받은 machine List를 저장
                this.mchList = res.data;
            })
        },
        updateMachineType(type,mchIdInPut) {
            //수정된 type을 props에 담아 UpdateMachineType modal을 띄움
            this.mchId = mchIdInPut;
            this.type = type;
            this.$modal.show("UpdateMachineType", {"type":type});
        },
    }
}
</script>