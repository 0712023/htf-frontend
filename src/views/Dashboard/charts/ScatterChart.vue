<template>
  <div class="small">
    현재 외부 온도 : <span id="outdoor"></span> °C
    <Scatter-chart :chart-data="datacollection"></Scatter-chart>
    {{$route.params.mchId}}
  </div>
</template>

<script>
  import axios from 'axios';
  import ScatterChart from '../../../assets/js/ScatterChart.module'

  export default {
    components: {
      ScatterChart
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
      axios.post(`${this.$store.state.BACK_SERVER}/getMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId})

      this.chartInterval = setInterval(()=>{
        axios.post(`${this.$store.state.BACK_SERVER}/getMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId})
      }, 2000)
    },
    destroyed() {
      clearInterval(this.chartInterval);
      clearInterval(this.weatherInterval);
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['a','a','a','a','a'],
          datasets: [
            {
              label: ['a'],
              data: [
                {              
                  x: this.getRandomInt(),
                  y: this.getRandomInt(),
                },
              ]
            },
            {
              label: ['b'],
              data: [
                {              
                  x: this.getRandomInt(),
                  y: this.getRandomInt(),
                },
                {              
                  x: this.getRandomInt(),
                  y: this.getRandomInt(),
                },
              ]
            },
          ]
        }
      },
      getWeather () {

      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    },
    
  }
</script>
