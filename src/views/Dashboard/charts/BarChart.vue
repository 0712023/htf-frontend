<template>
  <div class="small">
    External Temperature : <span id="outdoorTemp"></span> °C
    <Bar-chart :chart-data="datacollection" :options="chartOptions"></Bar-chart>
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
        datacollection: {backgroundColor: '#f87979',},
        chartOptions: {
          scales: {
            yAxes: [{
              ticks: {
                min: -10,
                stepSize : 6,
              }
            }]
          }
        },
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
      axios.post(`${this.$store.state.BACK_SERVER}/getTempMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
        for (let incomingData of res.data) {
          this.datacollection.labels.push("");
          for (let dataset of this.datacollection.datasets) {
            dataset.data.push((incomingData.value));
          }
        }
      })

      this.chartInterval = setInterval(()=>{
        axios.post(`${this.$store.state.BACK_SERVER}/getTempMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
          this.datacollection.labels.push("");
          this.datacollection.datasets[0].data.push((res.data.value));
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
              label: 'Internal Temperature',
              backgroundColor: '#257cdf86',
              data: []
            },
          ]
        }
      },
      getWeather () {
        axios.get(`${this.$store.state.BACK_SERVER}/naverTempCrawler`, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
          document.getElementById("outdoorTemp").innerHTML = ((res.data));
        })
      },
    },
    
  }
</script>
