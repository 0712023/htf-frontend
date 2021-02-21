<template>
  <div class="small">
    <h3>Machines by type</h3>
    <Doughnut-chart :chart-data="datacollection"></Doughnut-chart>
  </div>
</template>

<script>
  import axios from 'axios';
  import DoughnutChart from '../../../assets/js/DoughnutChart.module'

  export default {
    components: {
      DoughnutChart
    },
    props: {
      machineList:Array
    },
    data () {
      return {
        datacollection: {},
        mchList:Array.from(new Set(this.machineList.map(v => v.type))),
        mchCount:Array.from(new Set(this.machineList.map(v => v.type))).map(v => this.typeCounter(this.machineList,v)),
      }
    },
    mounted () {
      this.fillData();
    },
    methods: {
      typeCounter (list, finder) {
        let count = 0;
        for (let e of list) {
          if (e.type == finder) {
            count+=1;
          }
        }
        return count;
      },
      fillData () {
        this.datacollection = {
          datasets: [{
              data: this.mchCount,
              backgroundColor: '#257cdf86',
          }],
          labels: this.mchList,
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
