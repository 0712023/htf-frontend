<template>
  <div class="small">
    현재 외부 온도 : <span id="outdoorTemp"></span> °C
    <Bar-chart :chart-data="datacollection"></Bar-chart>
    {{$route.params.mchId}}
  </div>
</template>

<script>
  import axios from 'axios';
  import BarChart from '../../../assets/js/BarChart.module'

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: {backgroundColor: '#f87979',}
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
        for (let incomingData of response.data) {
          this.datacollection.labels.push("");
          for (let dataset of this.datacollection.datasets) {
            dataset.data.push((incomingData.value));
          }
        }
      })

      this.chartInterval = setInterval(()=>{
      axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
        ).then(response =>{
          this.datacollection.labels.push("");
          this.datacollection.datasets[0].data.push((response.data.value));
        })

        if (this.datacollection.labels.length>9) {
          this.datacollection.labels.shift();
          for (let dataset of this.datacollection.datasets) {
            dataset.data.shift();
          }
        }
      }, 2000)
    },
    destroyed() {
      clearInterval(this.chartInterval);
      clearInterval(this.weatherInterval);
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [],
          datasets: [
            {
              label: '내부 온도',
              backgroundColor: '#999999',
              data: []
            },
          ]
        }
      },
      getWeather () {
        axios.post(`http://studioj.ddns.net/naverTempCrawler`,{},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}).then(response =>{
          document.getElementById("outdoorTemp").innerHTML = ((response.data));
        })
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    },
    
  }
</script>
