import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const options = {
  responsive: false,
  legend: {
    display: true
  }
}

export default {
  extends: Pie,
  mixins: [reactiveProp],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, options)
  }
}
