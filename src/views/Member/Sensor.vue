<template>
    <div>
        <div style="width:100%;">
            <div  class="wrap">
                <div class="box1" style="color:gray" v-if="memId!=null">
                    <div>
                        this sensor is : {{$route.params.desc}} <br><br>
                        type : {{$route.params.type}} <br><br>
                        <div>
                            go back to : <router-link :to="'/member/'+memId">{{memId}}</router-link> <br>
                        </div>
                    </div>
                </div>
                <div class="box1" style="color:gray" v-if="vendorId!=null">
                    <div>
                        this sensor is : {{$route.params.desc}} <br><br>
                        type : {{$route.params.type}} <br><br>
                        <div>
                            go back to : <router-link :to="'/vendor/'+vendorId">{{vendorId}}</router-link> <br>
                        </div>
                    </div>
                </div>
                <div class="box1" style="color:gray" v-if="$route.params.type.includes('Dust')">
                    <LineChart class="chart"/>
                </div>
                <div class="box1" style="color:gray" v-if="$route.params.type.includes('Temp')">
                    <BarChart class="chart"/>
                </div>
                <div class="box1" style="color:gray" v-if="$route.params.type.includes('Humid')">
                    <RadarChart class="chart"/>
                </div>
                <!-- <div class="box1" style="color:gray">
                    <BubbleChart class="chart"/>
                </div>
                <div class="box1" style="color:gray">
                    <ScatterChart class="chart"/>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from '../Dashboard/charts/LineChart'
import BarChart from '../Dashboard/charts/BarChart'
import RadarChart from '../Dashboard/charts/RadarChart'
// import BubbleChart from '../Dashboard/charts/BubbleChart'
// import ScatterChart from '../Dashboard/charts/ScatterChart'
export default {
    props:{
        sensorName: String,
        type: String
    },
    watch: {
        $route() {
            document.location.reload();
        }
    },
    components:{
        LineChart,BarChart,RadarChart,
        // BubbleChart,ScatterChart,
    },
    computed:{
        memId:function(){
            return this.$cookies.get("memId");
        },
        vendorId:function(){
            return this.$cookies.get("vendorId");
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
 @import '../../assets/css/style.css';
</style>