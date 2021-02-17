<template>
  <div id="standard">
    <modal name="UpdateMember"><UpdateMember /></modal> <br>
    <div>
      <button @click="modalshow">Update Password</button> <br>
    </div>
    <div>
      <UpdateMachine />
    </div>
  </div>
</template>

<script>
import UpdateMember from "./Modal/UpdateMember";
import UpdateMachine from "./Updates/UpdateMachine";
import EventBus from "../store/Eventbus";
export default {
  name: "setting",
  mounted() {
    this.$modal.hide("UpdateMember");
  },
  components: {
    UpdateMember, UpdateMachine
  },
  created: function () {
    EventBus.$on("modal", () => this.$modal.hide("UpdateMember"));
  },
  methods: {
    modalshow() {
      this.$modal.show("UpdateMember");
    },
  },
};
</script>