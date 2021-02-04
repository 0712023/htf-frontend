<template>
    <div>
        this is test
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