<template>
    <div>
        THree
        <Render/>
    </div>
</template>
<script>
import { mutations } from "@/store/store.js";
import Render from '../components/test'
export default {
    components: {
        Render
    },
    created:()=>{
   
        mutations.toggleNav();
    }
}
</script>