<template>
    <div style="color:white">
        <h2 style="">차트 및 기타 정보로 대시보드화가 이루어지는 곳입니다</h2>
        <LineChart style="width:50%; height:50%; position: absolute;" />
        <BarChart style="width:50%; height:50%; position: absolute; left:0px" />
    </div>
</template>
<script>
import LineChart from './charts/LineChart'
import BarChart from './charts/BarChart'
export default {
    components: {
        LineChart,BarChart,
    },
}
</script>