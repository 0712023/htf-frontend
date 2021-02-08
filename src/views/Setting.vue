<template>
  <div id="standard">
    <button @click="modalshow">회원정보수정</button>
    <modal name="UpdateMember"><UpdateMember /></modal>
  </div>
</template>

<script>
import UpdateMember from "./UpdateMember";
import EventBus from "../store/Eventbus";
export default {
  name: "setting",
  mounted() {
    this.$modal.hide("UpdateMember");
  },
  components: {
    UpdateMember,
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