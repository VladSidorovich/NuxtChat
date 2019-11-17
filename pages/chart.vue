<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props:["infoForChart"],
  mounted() {
    this.setup()
  },
  watch: {
    infoForChart() {
      setTimeout(() => this.setup()) 
    }
  },
  methods: {
    setup() {
      this.renderChart({
        labels: this.infoForChart.labels,
        datasets: [{
          label: '# of Votes',
          data: this.infoForChart.data,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2,
        }]
      }, {
        legend: {
            labels: {
              fontColor: '#FFFFFF'
            }
        }
      })
      this.$emit('loaded')
    }
  }
}
</script>

<style scoped>
  .chart-hystory {
    max-width: 500px;
    margin: 20px auto;
  }
</style>
