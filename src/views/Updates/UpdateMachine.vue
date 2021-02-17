<template>

  <div id="standard2">
    <modal name="UpdateMachine"><UpdateMachine :desc.sync="description" :mchIdProps.sync="mchId"/></modal><br><br><br>
    <table border="1" width="1000">
            <thead> 
            <tr><!--template 쓰는 이유 : v-for 이후에 th에서 v-if사용하기 위해서 -->
                <template v-for="(val, key) in mchList[0]" >
                    <th width="500" :key="key" v-if="key!='memId'" class="row.header">{{key}}</th>
                </template>
                <th width="500">update</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="machine in mchList" :key="machine.mchId">
                    <template v-for="(val, key) in machine" >
                        <td width="500" :key="key" v-if="key!='memId' && key!='vendorId'">{{val}}</td>
                        <td width="500" :key="key" v-if="key=='vendorId'">{{val.vendorId}}</td>
                    </template>
                    <!-- <td width="500"><input type="text" v-model="description"></td> -->
                    <td width="500"><button @click="updateMachineDesc(machine.description, machine.mchId)">update</button></td>
                </tr>
            </tbody>
        </table> <br>
        Update Machine Description
  </div>
</template>

<script>
import UpdateMachine from '../Modal/UpdateMachine'
import EventBus from '../../store/Eventbus'
import axios from 'axios'
export default {
  components:{
    UpdateMachine
  },
  mounted() {
    this.mchList = this.mchList.concat(JSON.parse(this.$cookies.get("mchList")))
  },
  data() {
    return {
      mchList: [],
      mchId:"",
      description: "",
    };
  },
  methods: {
    updateMachineDesc(desc,mchIdInPut) {
      //수정된 description을 props에 담아 UpdateMachine modal을 띄움
      this.mchId = mchIdInPut;
      this.description = desc;
      this.$modal.show("UpdateMachine", {"desc":desc});
    },
    getMachineList(){
      //UpdateMachine modal 가려질 때(즉, machine description이 종료되었을 경우) 새로운 machineList를 받아옴
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`,{"memId":this.$cookies.get("memId")})
      .then((res)=>{
        //machine description이 수정된 후의 machine List 데이터를 다시 쿠키에 넣어줌
        this.$cookies.set("mchList", JSON.stringify(res.data))
        this.mchList = res.data
      })
    }
  },
  created: function () {
    //UpdateMachine modal이 종료되었을 경우 새로운 machineList를 받아옴
    EventBus.$on("modal", () => {this.$modal.hide("UpdateMachine");this.getMachineList();});
  },
};
</script>

<style >
@import "../../assets/css/table.css";
</style>