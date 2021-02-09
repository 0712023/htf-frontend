<template>
  <div id="standard2">
    Update Machine Account <br /><br />
    <input type="text" placeholder="description" v-model="description" />
    <button @click="UpdateMember">센서 정보 수정</button>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../store/Eventbus";
export default {
  data() {
    return {
      description: "",
      
    };
  },
  methods: {
    UpdateMachine() {
      console.log(this.id);
      console.log(this.$cookie.get("accesstoken"));
      axios
        .post(`http://studioj.ddns.net/updateMachine`,{ mchId: this.id, description: this.description },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
        .then((response) => {
          alert("register success!");
          console.log(response.data);
          EventBus.$emit("modal", false);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  
  },
};
</script>