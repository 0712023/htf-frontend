<template>
  <div class="small">
    <Bar-chart :chart-data="datacollection"></Bar-chart>
    <button @click="fillData()">Randomize</button>
    <button @click="addData()">addData</button>
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
        datacollection: {}
      }
    },
    mounted () {
      this.fillData();
    },
    created() {
      this.addData();
    },
    destroyed() {
      clearInterval(this.chartInterval);
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
            }, {
              label: '외부 온도',
              backgroundColor: '#ffffff',
              data: []
            }
          ]
        }

      },
      addData () {
        console.log(this.$route.params.mchId);

        this.chartInterval = setInterval(()=>{
        axios.post(`http://studioj.ddns.net/getMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, 
          {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
          ).then(response =>{
            console.log(response.data);
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
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    },
    
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>