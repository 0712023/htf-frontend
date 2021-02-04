<template>
    <div>
        this is contact
    </div>
</template>
<script>
import Constant from '../store/Constant'
import store from '../store/store'
export default {
    created:()=>{
        store.commit(Constant.TOGGLENAV)
    }
}
</script>