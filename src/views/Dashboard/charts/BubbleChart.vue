<template>
  <div class="small">
    External Temperature : <span id="outdoor"></span> °C
    <Bubble-chart :chart-data="datacollection"></Bubble-chart>
    {{$route.params.mchId}}
  </div>
</template>

<script>
  import axios from 'axios';
  import BubbleChart from '../../../assets/js/BubbleChart.module'

  export default {
    components: {
      BubbleChart
    },
    data () {
      return {
        datacollection: {}
      }
    },
    mounted () {
      this.fillData();
    },
    created() {
      this.getWeather();
      this.weatherInterval = setInterval(()=>{
        this.getWeather();
      },600000);
      //처음에 10개 가져오는 것
      axios.post(`${this.$store.state.BACK_SERVER}/getMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
          res
      })

      this.chartInterval = setInterval(()=>{
        axios.post(`${this.$store.state.BACK_SERVER}/getMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
          res
        })
      }, 2000)
    },
    destroyed() {
      clearInterval(this.chartInterval);
      clearInterval(this.weatherInterval);
    },
  }
</script>

