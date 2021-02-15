<template>
  <div class="small">
    현재 외부 온도 : <span id="outdoor"></span> °C
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
      axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
        ).then(response =>{
          response
        // for (let incomingData of response.data) {
        //   this.datacollection.labels.push("");
        //   for (let dataset of this.datacollection.datasets) {
        //     dataset.data.push((incomingData.value));
        //   }
        // }
      })

      this.chartInterval = setInterval(()=>{
      axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
        ).then(response =>{
          response
        //   this.datacollection.labels.push("");
        //   this.datacollection.datasets[0].data.push((response.data.value));
        })

        // if (this.datacollection.labels.length>9) {
        //   this.datacollection.labels.shift();
        //   for (let dataset of this.datacollection.datasets) {
        //     dataset.data.shift();
        //   }
        // }
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
                  r: this.getRandomInt(),
                },
              ]
            },
            {
              label: ['b'],
              data: [
                {              
                  x: this.getRandomInt(),
                  y: this.getRandomInt(),
                  r: this.getRandomInt(),
                },
                {              
                  x: this.getRandomInt(),
                  y: this.getRandomInt(),
                  r: this.getRandomInt(),
                },
              ]
            },
          ]
        }
      },
      getWeather () {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=a4e87aed6466e3d8b4c848fd3b150d74`).then(response =>{
          document.getElementById("outdoor").innerHTML = parseInt((response.data.main.temp - 273.15)*10)/10;
        })
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    },
    
  }
</script>

