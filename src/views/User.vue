<template>
    <div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap" >
                <div class="box1" v-for="sensor in sensors" :key="sensor.mchId">
                    <router-link :to="'/sensor/'+sensor.description + '/mchid/' + sensor.mchId">{{ sensor.description }}</router-link>
                    <br><br>name : {{ sensor.description }} 
                    <br><br>mchId : {{ sensor.mchId }}
                    <br><br>value : {{ sensorDataStore[sensor.mchId] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    computed:{
        sensors(){
            return JSON.parse(
                this.$cookie.get("sensors"));
        },
    },
    data(){
        return {sensorDataStore:{}}
    },
    created:function(){
        this.dashboardInterval = setInterval(()=>{
                for(let index in this.sensors){
                    axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo1`, {"mchId": this.sensors[index].mchId}, 
                        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
                    .then(response =>{
                        this.$set(this.sensorDataStore, this.sensors[index].mchId, response.data.value)
                    })
                }
                console.log(this.sensorDataStore)
            }, 2000);
    },
    destroyed() {
      clearInterval(this.dashboardInterval);
    },
}
</script>

<style>
 @import '../assets/css/style.css';
</style>