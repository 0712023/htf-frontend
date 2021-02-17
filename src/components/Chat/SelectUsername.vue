<template>
  <div class="select-username">
    <form @submit.prevent="onSubmit">
      <input v-model="username" placeholder="Your username..." readonly/>
      <button :disabled="!isValid">Go</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SelectUsername",
  data() {
    return {
      username: this.userName(),
    };
  },
  computed: {
    isValid() {
      return this.username.length > 0;
    },
  },
  methods: {
    onSubmit() {
      this.$emit("input", this.username);
    },
    userName() {
      if(this.$cookies.get('adminId')) {
        return this.$cookies.get('adminId');
      } else if (this.$cookies.get('memId')) {
        return this.$cookies.get('memId');
      }
      return this.$cookies.get('vendorId');
    },
  },
};
</script>

<style scoped>
.select-username {
  width: 300px;
  margin: 200px auto 0;
}
</style>
