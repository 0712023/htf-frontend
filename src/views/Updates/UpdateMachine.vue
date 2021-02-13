<template>
  <div id="standard2">
    Update Machine Description <br>
    <modal name="UpdateMachine"><UpdateMachine :desc.sync="description" :mchIdProps.sync="mchId"/></modal>
    <table border="1" width="1000">
            <thead> 
            <tr><!--template 쓰는 이유 : v-for 이후에 th에서 v-if사용하기 위해서 -->
                <template v-for="(val, key) in mchList[0]">
                    <th width="500" :key="key" v-if="key!='memId'" >{{key}}</th>
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
        </table> 
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
        // this.$modal.hide('register');
        this.mchList = this.mchList.concat(JSON.parse(this.$cookie.get("mchList")))
    },
  data() {
    return {
      mchList: [],
      description: "asd",
      mchId:"sh",
    };
  },
  methods: {
    updateMachineDesc(desc,mchIdInPut) {
      this.mchId = mchIdInPut;
      this.description = desc;
      this.$modal.show("UpdateMachine", {"desc":desc});
    },
    getMachineList(){
      axios.post(`http://studioj.ddns.net/getMachineListByMemId`,{"memId":this.$cookie.get("memId")},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
      .then((res)=>{
          console.log({machinList:res.data});
          this.$cookie.set("mchList", JSON.stringify(res.data))
          this.mchList = res.data
      })
      .catch((err)=>{
          console.log(err);
      })
    }
  },
  created: function () {
    EventBus.$on("modal", () => {this.$modal.hide("UpdateMachine");this.getMachineList();});
  },
};
</script>