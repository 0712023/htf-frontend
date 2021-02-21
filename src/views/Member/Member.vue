<template>
    <div>
        <div style="width:100%;">
            <div class="top-long-box" v-if="(this.$cookies.get('kakaoToken')=='null')">
                <kakaoRegister/>
            </div>
            <div class="top-long-box" style="height: 50px">
                좋은하루 되세요! 
                <select v-model="selectedType">
                    <option value="all" selected>all</option>
                    <option :value="typeSelector" v-for="typeSelector in new Set(mchList.map(v => v.type))" :key='typeSelector'>{{typeSelector}}</option>
                </select>
            </div>
            <div  class="wrap" >
                <div class="box1">
                    <DoughnutChart :machineList='mchList'/>
                </div>
                <div class="box1" v-for="sensor in mchList" :key="sensor.mchId" v-show="sensor.type==selectedType || selectedType=='all'">
                    <div>
                        <router-link :to="'/sensor/'+sensor.description + '/mchid/' + sensor.mchId + '/type/' + sensor.type">{{ sensor.description }}</router-link>
                        <hr><br>name : {{ sensor.description }} 
                        <br><br>type : {{ sensor.type }}
                        <br><br>mchId : {{ sensor.mchId }}<span v-if="sensor.type.includes('Temp')"><br><br>Temparature : {{ sensorDataStore[sensor.mchId] }} °C</span>
                        <br><br>vendorId : {{ sensor.vendorId.vendorId }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import DoughnutChart from '../Dashboard/charts/DoughnutChart'
import kakaoRegister from '../../components/KakaoRegisterButton'

export default {
    components: {
        DoughnutChart,
        kakaoRegister,
    },
    mounted(){
        axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`, {"memId": this.$cookies.get("memId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then((res)=>{
            console.log(res.data);
            this.mchList = res.data;
        })
    },
    data(){
        return {
            mchList:null,
            sensorDataStore:{},
            selectedType:'all',
        };
    },
    created:function(){
        //2초에 한번씩 실행
        this.dashboardInterval = setInterval(()=>{
            //모든 machine들의 최신 데이터를 backend server에 요청
            for(let index in this.mchList){
                axios.post(`${this.$store.state.BACK_SERVER}/getTempMeasureListByMchIdTo1`, {"mchId": this.mchList[index].mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
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