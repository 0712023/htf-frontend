<template>
  <div>
    <modal name="UpdateMachine"><UpdateMachine :desc.sync="description" :mchIdProps.sync="mchId"/></modal><br>
    <table border="1" width="1000">
            <thead>
            <tr><!--template 쓰는 이유 : v-for 이후에 th에서 v-if사용하기 위해서 -->
              <template v-for="(val, key) in mchList[0]">
                  <th width="500" :key="key" v-if="key!='memId'" >{{key}}</th>
              </template>
              <th width="500">update</th>
              <th width="500">delete</th>
            </tr>
            </thead>
            
            <tbody>
                <tr v-for="machine in mchList" :key="machine.mchId">
                    <template v-for="(val, key) in machine" >
                        <td width="500" :key="key" v-if="key!='memId' && key!='vendorId'">{{val}}</td>
                        <td width="500" :key="key" v-if="key=='vendorId'">{{val.vendorId}}</td>
                    </template>
                    <td width="500"><button @click="updateMachineDesc(machine.description, machine.mchId)">update</button></td>
                    <td width="500"><button @click="deleteMachine(machine.mchId)">delete</button></td>
                </tr>
            </tbody>
        </table> <br>
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
    axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId": this.$cookies.get("memId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then((res)=>{
            console.log(res.data);
            this.mchList = res.data;
        })
  },
  data() {
    return {
      mchList: [],
      description: "asd",
      mchId:"sh",
    };
  },
  methods: {
    updateMachineDesc(desc, mchIdInPut) {
      if(this.$cookies.get("memRank") != 'basic'){
        this.mchId = mchIdInPut;
        this.description = desc;
        this.$modal.show("UpdateMachine", {"desc":desc});
      } else {
        alert("basic grade can't update machine description");
        this.$router.push("/subscribe/");
      }
    },
    getMachineList(){
      axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId":this.$cookies.get("memId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
      .then((res)=>{
          this.$cookies.set("mchList", JSON.stringify(res.data))
          this.mchList = res.data
      })
    },
    deleteMachine(mchId){
      confirm("정말 삭제하시겠습니까? : " + mchId);
      axios.post(`${this.$store.state.BACK_SERVER}/deleteMeasurebyMchId`, {"mchId":mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
      .then(()=>{
        axios.post(`${this.$store.state.BACK_SERVER}/deleteMachine`, {"mchId":mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(()=>{
          alert("delete machine "+mchId);
          this.getMachineList();
        })
      })
    }
  },
  created: function () {
    EventBus.$on("modal", () => {this.$modal.hide("UpdateMachine");this.getMachineList();});
  },
};
</script>
