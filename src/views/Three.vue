<template>
    <div>
        THree
        <Render/>
    </div>
</template>
<script>
import Constant from '../store/Constant'
import store from '../store/store'
import Render from '../components/test'
export default {
    components: {
        Render
    },
    created:()=>{
        store.commit(Constant.TOGGLENAV)
    }
}
</script>