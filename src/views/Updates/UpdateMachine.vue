<template>
  <div id="standard2">
    Update Machine Description <br>
    <modal name="UpdateMachine"><UpdateMachineModal :desc.sync="description" :mchIdProps.sync="mchId"/></modal>
    <table border="1" width="1000">
            <thead> 
            <tr><!--template 쓰는 이유 : v-for 이후에 th에서 v-if사용하기 위해서 -->
                <template v-for="(val, key) in mchList[0]">
                    <th width="500" :key="key" v-if="key!='memId'" >{{key}}</th>
                    <!-- <th width="500">new description</th> -->
                </template>
                <th width="500">수정</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="machine in mchList" :key="machine.mchId">
                    <template v-for="(val, key) in machine" >
                        <td width="500" :key="key" v-if="key!='memId'">{{val}}</td>
                    </template>
                    <!-- <td width="500"><input type="text" v-model="description"></td> -->
                    <td width="500"><button @click="modalshow(machine.description, machine.mchId)">수정하기</button></td>
                </tr>
            </tbody>
        </table> 
  </div>
</template>

<script>
import UpdateMachineModal from '../Modal/UpdateMachineModal'
export default {
  components:{
    UpdateMachineModal
  },
  data() {
    return {
      mchList: JSON.parse(this.$cookie.get("sensors")),
      description: "asd",
      mchId:"sh",
    };
  },
  methods: {
    modalshow(desc,mchIdInPut) {
      this.mchId = mchIdInPut;
      this.description = desc;
      this.$modal.show("UpdateMachine", {"desc":desc});
    },
  },
};
</script>