<template>
    <div>
        <div style="width:100%;">
            <div  class="wrap" >
                <div class="box1" v-for="sensor in mchList" :key="sensor.mchId">
                    <div>
                        <router-link :to="'/sensor/'+sensor.description + '/mchid/' + sensor.mchId + '/type/' + sensor.type">{{ sensor.description }}</router-link>
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
        //2초에 한번씩 실행
        this.dashboardInterval = setInterval(()=>{
            //모든 machine들의 최신 데이터를 backend server에 요청
            for(let index in this.mchList){
                axios.post(`${this.$store.state.BACK_SERVER}/getTempMeasureListByMchIdTo1`, {"mchId": this.mchList[index].mchId})
                .then(res =>{
                    //반환받은 데이터의 value값을 sensorDataStore에 저장 (key:mchId, value:data.value)
                    this.$set(this.sensorDataStore, this.mchList[index].mchId, res.data.value)
                })
            }
            console.log(this.sensorDataStore)
            }, 2000);
    },
    destroyed() {
        //페이지 이동시 interval 종료
        clearInterval(this.dashboardInterval);
    },
}
</script>

<style>
 @import '../../assets/css/style.css';
</style>