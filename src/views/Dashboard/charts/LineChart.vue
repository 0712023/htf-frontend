<template>
  <div class="small">
    External Fine Dust : <span id="outdoorDust"></span> <br> Fine Dust Status : <span id="dustStatus"></span>
    <line-chart :chart-data="datacollection" :options="chartOptions"></line-chart>
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
        datacollection: {},
        chartOptions: {
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
                stepSize : 6,
              }
            }]
          }
        },
      }
    },
    mounted () {
      this.resetData();
    },
    created () {
      this.getDust();
      //처음에 10개 가져오는 것
      axios.post(`${this.$store.state.BACK_SERVER}/getDustMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
      .then(res =>{
        for (let incomingData of res.data) {
          this.datacollection.labels.push("");
          this.datacollection.datasets[0].data.push((incomingData.value));
        }
      })
      axios.post(`${this.$store.state.BACK_SERVER}/getDustTenMeasureListByMchIdTo10`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
      .then(res =>{
        for (let incomingData of res.data) {
          this.datacollection.datasets[1].data.push((incomingData.value));
        }
      })

      this.chartInterval = setInterval(()=>{
        axios.post(`${this.$store.state.BACK_SERVER}/getDustMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(response =>{
          this.datacollection.labels.push("");
          this.datacollection.datasets[0].data.push((response.data.value));
        })
        axios.post(`${this.$store.state.BACK_SERVER}/getDustTenMeasureListByMchIdTo1`, {"mchId": this.$route.params.mchId}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(response =>{
          this.datacollection.datasets[1].data.push((response.data.value));
          if (response.data.value < 16) {
            document.getElementById('dustStatus').innerHTML = '<span style="color:blue;">Good</span>';
          } else if (response.data.value < 36) {
            document.getElementById('dustStatus').innerHTML = '<span style="color:Orange;">So-so</span>';
          } else {
            document.getElementById('dustStatus').innerHTML = '<span style="color:Red;">Bad</span>';
          }
        })

        if (this.datacollection.datasets[0].data.length>9) {
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
          datasets: [
            {
              label: 'PM2.5',
              backgroundColor: '#05700f86',
              data: []
            },
            {
              label: 'PM10',
              backgroundColor: '#257cdf86',
              data: []
            }
          ]
        }
      },
      getDust () {
        axios.get(`${this.$store.state.BACK_SERVER}/naverDust`, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
        .then(res =>{
          document.getElementById("outdoorDust").innerHTML = parseInt(res.data);
        })
      },
    }
  }
</script>
