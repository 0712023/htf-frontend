import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)

  },
  methods: {
  },
  created() {
    this.lineChartInterval = setInterval(() => {
      this.chartData.labels.push(Math.floor(Math.random() * (25 - 5 + 1)) + 5);
      this.chartData.datasets[0].data.push(Math.floor(Math.random() * (25 - 5 + 1)) + 5);
      this.chartData.datasets[1].data.push(Math.floor(Math.random() * (25 - 5 + 1)) + 5);
      if (this.chartData.labels.length >= 10) {
        this.chartData.labels.shift();
        for (let dataset of this.chartData.datasets) {
          dataset.data.shift();
        }
      }
      this.$data._chart.update()
    }, 2000);
  },
  destroyed() {
    clearInterval(this.lineChartInterval);
  },
}