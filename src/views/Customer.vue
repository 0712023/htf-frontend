<template>
    <div>
        <Cusdata/>
    </div>
</template>

<script>
import Cusdata from '../components/Cusdata.vue';
import { mutations } from "@/store/store.js";
export default {
    components:{
        Cusdata
    },
     created:()=>{
        mutations.toggleNav();
    }
}
</script>