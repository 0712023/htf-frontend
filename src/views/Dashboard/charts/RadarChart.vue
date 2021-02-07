<template>
  <div class="small">
    <Radar-chart :chart-data="datacollection" chart:update="addData()"></Radar-chart>
    <!-- <button @click="fillData()">Randomize</button> -->
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
      this.addData();
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['','','','',''],
          datasets: [
            {
              label: '내부 습도',
              backgroundColor: '#999999',
              data: []
            }, {
              label: '외부 습도',
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
            if (this.datacollection.datasets[0].data.length>5) {
              this.datacollection.datasets[0].data.shift();
              this.datacollection.datasets[1].data.shift();
            }
            this.datacollection.datasets[0].data.push((response.data.value));
            this.datacollection.datasets[1].data.push((response.data.value + 0.1));
          })

        }, 2000)
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