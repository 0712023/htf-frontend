<template>
    <div>
        this is test
        <Chart/>
    </div>
</template>
<script>
import Constant from '../store/Constant'
import store from '../store/store'
import Chart from '../components/Dashboard/Chart'
export default {
    components: {
        Chart
    },
    created:()=>{
        store.commit(Constant.TOGGLENAV)
    }
}
</script>