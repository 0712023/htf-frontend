<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    {{$route.params.mchId}}
  </div>
</template>

<script>
  import axios from 'axios';
  import LineChart from '../../../assets/js/LineChart.module'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {}
      }
    },
    mounted () {
      this.resetData();
    },
    created () {
      console.log(this.$route.params.mchId);
      //처음에 10개 가져오는 것
      axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
        ).then(response =>{
        console.log(response.data);
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
          console.log(response.data);
          console.log(this.$route.params.mchId);
          this.datacollection.labels.push("");
          for (let dataset of this.datacollection.datasets) {
            dataset.data.push((response.data.value));
          }
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
      this.resetData();
    },
    methods: {
      resetData () {
        this.datacollection = {
          labels: [],
          datasets: [
            {
              label: '내부 미세먼지',
              backgroundColor: '#999999',
              data: []
            }, {
              label: '외부 미세먼지',
              backgroundColor: '#ffffff',
              data: []
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>