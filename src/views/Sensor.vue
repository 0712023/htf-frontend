<template>
    <div>
        <div style="text-align: center;">
            <div v-if="memId!=null">
                this sensor is : <router-link :to="'/member/'+memId">{{$route.params.desc}}</router-link> <br>
            </div>
            <div v-if="vendorId!=null">
                this sensor is : <router-link :to="'/vendor/'+vendorId">{{$route.params.desc}}</router-link> <br>
            </div>
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
                <div class="box1" style="color:gray">
                    <BubbleChart class="chart"/>
                </div>
                <div class="box1" style="color:gray">
                    <ScatterChart class="chart"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from './Dashboard/charts/LineChart'
import BarChart from './Dashboard/charts/BarChart'
import RadarChart from './Dashboard/charts/RadarChart'
import BubbleChart from './Dashboard/charts/BubbleChart'
import ScatterChart from './Dashboard/charts/ScatterChart'
export default {
    props:{
        sensorName: String
    },
    components:{
        LineChart,BarChart,RadarChart,BubbleChart,ScatterChart
    },
    computed:{
        memId:function(){
            return this.$cookie.get("memId");
        },
        vendorId:function(){
            return this.$cookie.get("vendorId");
        }
    },
    methods: {
        goBack() {
            history.go(-1);
        }
    },
}
</script>
<style>
 @import '../assets/css/style.css';
</style>