<template>
    <div>
        this is contact
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