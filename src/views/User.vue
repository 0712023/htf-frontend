<template>
    <div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap">
                <div class="box1" v-for="sensor in sensors" :key="sensor.mch_id" >
                    <router-link :to="'/sensor/'+sensor.description + '/mchid/' + sensor.mch_id">{{ sensor.description }}</router-link>
                    <br><br>name : {{ sensor.description }} 
                    <br><br>mch_id : {{ sensor.mch_id }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        sensors(){
            return JSON.parse(this.$cookie.get("sensors"));
        }
    }
    // 여기서 만약 토큰 로그인이 유효한 상태라면 액시오스를 다시 날려주는 로직이 있어야 새로고침을 해도 오류가 나지 않을 것으로 생각
}
</script>

<style>
 @import '../assets/css/style.css';
</style>