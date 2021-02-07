<template>
    <div>
        <div>
            this sensor is : <router-link :to="'/user/'+userId">{{$route.params.desc}}</router-link> <br>
        </div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap">
                <div class="box1" style="color:gray">
                    <LineChart class="chart"/>
                </div>
                <div class="box1" style="color:gray">
                    <BarChart class="chart"/>
                </div>
                <div class="box1" style="color:gray">
                    <RadarChart class="chart"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from './Dashboard/charts/LineChart'
import BarChart from './Dashboard/charts/BarChart'
import RadarChart from './Dashboard/charts/RadarChart'
export default {
    props:{
        sensorName: String
    },
    components:{
        LineChart,BarChart,RadarChart
    },
    computed:{
        userId:function(){
            return this.$cookie.get("userId");
        }
    }
}
</script>
<style>
 @import '../assets/css/style.css';
</style>