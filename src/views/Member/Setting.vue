<template>
  <div id="standard">
    <div>
      <UpdateMember />
    </div>
    <div>
      <UpdateMachine />
    </div>
  </div>
</template>

<script>
import UpdateMember from "../Updates/UpdateMember";
import UpdateMachine from "../Updates/UpdateMachine";
import EventBus from "../../store/Eventbus";
export default {
  name: "setting",
  mounted() {
    this.$modal.hide("UpdateMember");
  },
  components: {
    UpdateMachine, UpdateMember
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