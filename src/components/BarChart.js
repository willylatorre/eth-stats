import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const options = {
  responsive: false,
  legend: {
    display: true
  },
  scales: {
    xAxes: [ {
      categoryPercentage: 0.9,
      barPercentage: 0.9,
      ticks: {
        autoSkip: false
      }
    }]
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem) {
        return tooltipItem.yLabel
      }
    }
  }
}

export default {
  extends: Bar,
  mixins: [reactiveProp],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, options)
  }
}
