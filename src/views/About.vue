<template>
    <div>
        this is about
    </div>
</template>
<script>
import { mutations } from "@/store/store.js";
export default {
    created:()=>{
        mutations.toggleNav();
    }
}
</script>