<template>
    <div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap">
                <div class="box1" v-for="sensor in sensors" :key="sensor.seq" >
                    <router-link :to="'/sensor/'+sensor.desc">{{ sensor.desc }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store/store";
export default {
    data() {
    return { sensors: store.state.routes };
  },
}
</script>