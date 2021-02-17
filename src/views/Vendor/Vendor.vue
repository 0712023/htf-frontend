<template>
    <div>
        <div class="top-long-box">
            제품에 관해 연락할 사항이 있다면 abc@def.com 으로 연락주시면 감사하겠습니다.
            <select v-model="selectedType">
                <option value="all" selected>all</option>
                <option :value="typeSelector" v-for="typeSelector in new Set(mchList.map(v => v.type))" :key='typeSelector'>{{typeSelector}}</option>
            </select>
        </div>
        <div style="width:100%;">
            <div  class="wrap" >
                <div class="box1" v-for="sensor in mchList" :key="sensor.mchId" v-show="sensor.type==selectedType || selectedType=='all'">
                    <div>
                        <router-link :to="'/sensor/'+sensor.description + '/mchid/' + sensor.mchId">{{ sensor.mchId }}</router-link>
                        <br><br>name : {{ sensor.description }} 
                        <br><br>mchId : {{ sensor.mchId }}
                        <br><br>value : {{ sensorDataStore[sensor.mchId] }}
                        <br><br>type : {{ sensor.type }}
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
            selectedType:'all', 
            notSelected:true,
        }
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
 @import '../../assets/css/style.css';
</style>