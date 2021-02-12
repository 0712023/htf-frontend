<template>
    <div>
        <template>
            <div>
                <button @click="getKakaoToken">카카오 토큰 가입하기!</button>
            </div>
        </template>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap" >
                <div class="box1" v-for="sensor in mchList" :key="sensor.mchId">
                    <router-link :to="'/sensor/'+sensor.description + '/mchid/' + sensor.mchId">{{ sensor.description }}</router-link>
                    <br><br>name : {{ sensor.description }} 
                    <br><br>mchId : {{ sensor.mchId }}
                    <br><br>value : {{ sensorDataStore[sensor.mchId] }}
                    <br><br>vendorId : {{ sensor.vendorId.vendorId }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
        getKakaoToken(){
            location.href='https://kauth.kakao.com/oauth/authorize?client_id='+this.RESTAPIKEY+'&redirect_uri='+this.REDIRECT_URI+'&response_type=code'
        },
    },
    computed:{
        mchList(){
            return JSON.parse(
                this.$cookie.get("mchList"));
        },
    },
    data(){
        return {sensorDataStore:{}
        ,RESTAPIKEY:'2de887fb3941336bf23b2d3a76d82991',
        REDIRECT_URI:'http://localhost:8080/kakaoLogin', //front server
        }
    },
    created:function(){
        this.dashboardInterval = setInterval(()=>{
                for(let index in this.mchList){
                    axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo1`, {"mchId": this.mchList[index].mchId}, 
                        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}})
                    .then(response =>{
                        this.$set(this.sensorDataStore, this.mchList[index].mchId, response.data.value)
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