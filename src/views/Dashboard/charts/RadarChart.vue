<template>
  <div class="small">
    <Radar-chart :chart-data="datacollection" chart:update="addData()"></Radar-chart>
    <!-- <button @click="fillData()">Randomize</button> -->
    {{$route.params.mch_id}}
  </div>
</template>

<script>
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
    created: () => {
      
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: '내부 습도',
              backgroundColor: '#999999',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: '외부 습도',
              backgroundColor: '#ffffff',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
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