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
      console.log(this.$route.params.mchId);

      this.chartInterval = setInterval(()=>{
      axios.post(`http://studioj.ddns.net/getMeasureListByMchId`, {"mchId": this.$route.params.mchId}, 
        {headers: { Authorization: `Bearer ${this.$cookie.get("accesstoken")}`}}
        ).then(response =>{
          console.log(response.data);
          this.datacollection.labels.push("");
          for (let dataset of this.datacollection.datasets) {
            dataset.data.push(parseInt(response.data[0].value) + Math.random()*5 );
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
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: '내부 온도',
              backgroundColor: '#999999',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: '외부 온도',
              backgroundColor: '#ffffff',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }

      },
      addData () {
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