<template>
    <div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap">
            <div v-for="(value, index) in members" :key="index">
                <div class="box1" >
                    유저 : <router-link :to="'/user/'+value.memId">{{ value.memId }}</router-link>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script type="module">
export default {
    computed: {
      members() {
        return JSON.parse(this.$cookie.get("members"));
      }
    },
    data: function () {
    return {
      user: [],
    };
  },
}
</script>