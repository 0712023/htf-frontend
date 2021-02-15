<template>
  <div class="small">
    외부 습도 : <span id="outdoorHumidity"></span>
    <Radar-chart :chart-data="datacollection" chart:update="addData()"></Radar-chart>
    {{$route.params.mchId}}
  </div>
</template>

<script>
  import axios from 'axios';
  import RadarChart from '../../../assets/js/RadarChart.module'

  export default {
    components: {
      RadarChart
    },
    data () {
      return {
        datacollection: {}
      }
    },
    mounted () {
      this.fillData();
    },
    created () {
      this.getWeather();
      this.humidityInterval = setInterval(()=>{
        this.getWeather();
      }, 600000)
      //처음에 10개 가져오는 것
      axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
        ).then(response =>{
        for (let incomingData of response.data) {
          this.datacollection.datasets[0].data.push((incomingData.value));
        }
      })

      this.chartInterval = setInterval(()=>{
      axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
        ).then(response =>{
          if (this.datacollection.datasets[0].data.length > 9) {
            this.datacollection.datasets[0].data.shift();
          }
          this.datacollection.datasets[0].data.push((response.data.value));
        })

      }, 2000)
    },
    destroyed() {
      clearInterval(this.chartInterval);
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['','','','','','','','','',''],
          datasets: [
            {
              label: '내부 습도',
              backgroundColor: '#999999',
              data: []
            }
          ]
        }
      },
      getWeather () {
        axios.post(`http://studioj.ddns.net/naverHumidtyCrawler`,{},{headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}).then(response =>{
          document.getElementById("outdoorHumidity").innerHTML = response.data;
        })
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    }
  }
</script>
