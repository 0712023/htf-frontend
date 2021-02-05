<template>
    <div style="color='white'">
        <h2 style="">차트 및 기타 정보로 대시보드화가 이루어지는 곳입니다</h2>
        <Chart/>
    </div>
</template>
<script>
import Constant from '../store/Constant'
import store from '../store/store'
import Chart from './Dashboard/Chart'
export default {
    components: {
        Chart
    },
    created:()=>{
        store.commit(Constant.TOGGLENAV)
    }
}
</script>