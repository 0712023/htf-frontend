<template>
  <div class="small">
    <Pie-chart :chart-data="datacollection"></Pie-chart>
  </div>
</template>

<script>
  import PieChart from '../../../assets/js/PieChart.module'

  export default {
    components: {
      PieChart
    },
    props: {
      memberlist:Array
    },
    mounted () {
      this.fillData();
    },
    data () {
      return {
        datacollection: {},
        mchList:Array.from(new Set(this.memberlist.map(v => v.memRank))),
        mchCount:Array.from(new Set(this.memberlist.map(v => v.memRank))).map(v => this.gradeCounter(this.memberlist,v)),
      }
    },
    methods: {
      gradeCounter (list, finder) {
        let count = 0;
        for (let e of list) {
          if (e.memRank == finder) {
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
    },
  }
</script>
