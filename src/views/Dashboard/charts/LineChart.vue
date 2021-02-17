<template>
  <div class="small">
    외부 미세먼지 : <span id="outdoorDust"></span>
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
      this.getDust();
      //처음에 10개 가져오는 것
      axios.post(`${this.$store.state.BACK_SERVER}/getMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId})
      .then(res =>{
        for (let incomingData of res.data) {
          this.datacollection.labels.push("");
          for (let dataset of this.datacollection.datasets) {
            dataset.data.push((incomingData.value));
          }
        }
      })

      this.chartInterval = setInterval(()=>{
        axios.post(`${this.$store.state.BACK_SERVER}/getMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId})
        .then(response =>{
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
            }
          ]
        }
      },
      getDust () {
        axios.post(`${this.$store.state.BACK_SERVER}/naverDust`)
        .then(res =>{
          document.getElementById("outdoorDust").innerHTML = parseInt(res.data);
        })
      },
    }
  }
</script>
