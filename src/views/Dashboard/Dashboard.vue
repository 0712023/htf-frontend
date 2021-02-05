<template>
    <div style="color:white">
        <h2 style="">차트 및 기타 정보로 대시보드화가 이루어지는 곳입니다</h2>
        <LineChart />
    </div>
</template>
<script>
import LineChart from './charts/LineChart'
export default {
    components: {
        LineChart
    },
}
</script>