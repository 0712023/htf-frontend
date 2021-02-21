<template>
    <div id="standard">     
       <h2>Machine List</h2> <br>
       <div class="top-long-box">
            <font size="3em">
                type 변경시 명칭은 'Temp', 'Humid', 'Dust' 등의 앞부분과 / 'Sensor', 'Machine' 등의 뒷부분을 통일하여 변경해주시기 바랍니다. <br>
                <br><br>
                ex) TempSensor, DustMachine, DustFan
            </font>
       </div>
        <table border="1" width="1000">
            <thead> 
            <tr><!--template 쓰는 이유 : v-for 이후에 th에서 v-if사용하기 위해서 -->
                <template v-for="(val, key) in mchList[0]">
                    <th width="300" :key="key" >{{key}}</th>
                </template>
                <th width="300">delete machine</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="machine in mchList" :key="machine.mchId">
                    <template v-for="(val, key) in machine" >
                        <td :key="key" v-if="key!='vendorId' && key!='memId'">{{val}}</td>
                        <td :key="key" v-if="key=='vendorId'">{{val.vendorId}}</td>
                        <td :key="key" v-if="key=='memId'">{{val.memId}}</td>
                    </template>
                    <td><button @click="deleteMachine(machine.mchId)">delete</button></td>
                </tr>
            </tbody>
        </table> 
        <br>
        <button @click="modalshow">Add</button>
        <modal name="MachineRegister"><MachineRegister/></modal>
    </div>
</template>

<script>
import axios from 'axios'
import MachineRegister from '../Modal/MachineRegister'
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
        MachineRegister
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
            axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByVendorId`, {"vendorId":this.$cookies.get("vendorId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
            .then((res)=>{
                //반환받은 machine List를 저장
                this.mchList = res.data;
            })
        },
        deleteMachine(mchId){
            axios.post(`${this.$store.state.BACK_SERVER}/deleteMachineByMchId`, {mchId:mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
            .then(()=>{
                alert("delete machine "+mchId);
                this.getMachineList();
            })
        }
    }
}
</script>