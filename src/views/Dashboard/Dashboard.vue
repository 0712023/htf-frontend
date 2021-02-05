<template>
    <div style="color:blue">
        <h2 style="">차트 및 기타 정보로 대시보드화가 이루어지는 곳입니다</h2>
        <LineChart style="width:30%; height:30%; position: absolute; right:40%; top:0px; min-width:300px" />
        <BarChart style="width:30%; height:30%; position: absolute; left:0px; top:0px; min-width:300px" />
        <RadarChart style="width:30%; height:30%; position: absolute; right:0px; min-width:300px" />
    </div>
</template>
<script>
import LineChart from './charts/LineChart'
import BarChart from './charts/BarChart'
import RadarChart from './charts/RadarChart'

export default {
    components: {
        LineChart,BarChart,RadarChart
    },
}
</script>