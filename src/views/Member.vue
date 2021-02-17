<template>
    <div>
        <div style="width:100%;">
            <div  class="wrap" >
                <div class="box1" v-for="sensor in mchList" :key="sensor.mchId">
                    <div>
                        <router-link :to="'/sensor/'+sensor.description + '/mchid/' + sensor.mchId">{{ sensor.description }}</router-link>
                        <br><br>name : {{ sensor.description }} 
                        <br><br>mchId : {{ sensor.mchId }}
                        <br><br>value : {{ sensorDataStore[sensor.mchId] }}
                        <br><br>vendorId : {{ sensor.vendorId.vendorId }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    computed:{
        mchList(){
            return JSON.parse(this.$cookies.get("mchList"));
        },
    },
    data(){
        return {
            sensorDataStore:{},
        };
    },
    created:function(){
        this.dashboardInterval = setInterval(()=>{
                for(let index in this.mchList){
                    axios.post(`${this.$store.state.BACK_SERVER}/getMeasureListByMchIdTo1`, {"mchId": this.mchList[index].mchId})
                    .then(res =>{
                        this.$set(this.sensorDataStore, this.mchList[index].mchId, res.data.value)
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