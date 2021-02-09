<template>
  <div id="standard2">
    Update Machine Description <br>
    <modal name="UpdateMachine"><UpdateMachineModal/></modal>
    <table border="1" width="1000">
            <thead> 
            <tr>
                <th width="500" v-for="(val, key) in mchList[0]" :key="key">{{key}}</th>
                <!-- <th width="500">new description</th> -->
                <th width="500">수정</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="machine in mchList" :key="machine.mchId">
                    <td width="500" v-for="(val, key) in machine" :key="key">{{val}}</td>
                    <!-- <td width="500"><input type="text" v-model="description"></td> -->
                    <td width="500"><button @click="modalshow(machine.description)">수정하기</button></td>
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
      description: "",
    };
  },
  methods: {
    modalshow(desc) {
      this.$modal.show("UpdateMachine", {"desc":desc});
    },
  },
};
</script>