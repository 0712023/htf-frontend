<template>
  <div class="small">
    External Humidity : <span id="outdoorHumidity"></span>
    <Radar-chart :chart-data="datacollection" chart:update="addData()" :options="chartOptions"></Radar-chart>
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
        datacollection: {},
        chartOptions: {
          scale: {
              ticks: {
                  beginAtZero: true,
                  min: 0,
              }
          }
        },
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
      axios.post(`${this.$store.state.BACK_SERVER}/getHumidMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
      .then(res =>{
        for (let incomingData of res.data) {
          this.datacollection.datasets[0].data.push((incomingData.value));
        }
      })

      this.chartInterval = setInterval(()=>{
        axios.post(`${this.$store.state.BACK_SERVER}/getHumidMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
            if (this.datacollection.datasets[0].data.length > 9) {
              this.datacollection.datasets[0].data.shift();
            }
            this.datacollection.datasets[0].data.push((res.data.value));
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
              backgroundColor: '#257cdf86',
              data: []
            }
          ]
        }
      },
      getWeather () {
        axios.get(`${this.$store.state.BACK_SERVER}/naverHumidtyCrawler`, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
          document.getElementById("outdoorHumidity").innerHTML = res.data;
        })
      },
    }
  }
</script>
