<template>
  <div class="in-severity-chart">
    <ep-chart :options="chartOptions" />
  </div>
</template>

<script setup>
  import Highcharts from 'highcharts'

  const colors = Highcharts.getOptions().colors
  const categories = ['Low', 'Medium', 'High', 'Critical']
  // highcharts bar chart options
  const chartOptions = {
    chart: {
      type: 'column',
      // height: '300px',
      backgroundColor: 'transparent',
    },
    // title: {
    //   text: 'Vulnerabilities by Severity',
    //   style: {
    //     color: 'var(--text-color)',
    //     fontSize: 'var(--font-size--large)',
    //   },
    // },
    xAxis: {
      categories: categories,
      // labels: {
      //   style: {
      //     color: 'var(--text-color)',
      //     fontSize: 'var(--font-size--small)',
      //   },
      // },
    },
    yAxis: {
      title: {
        text: 'Number of Vulnerabilities',
        // style: {
        //   color: 'var(--text-color)',
        //   fontSize: 'var(--font-size--small)',
        // },
      },
      labels: {
        // style: {
        //   color: 'var(--text-color)',
        //   fontSize: 'var(--font-size--small)',
        // },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        colorByPoint: true,
        colors: colors,
      },
    },
    series: [
      {
        name: 'Vulnerabilities',
        data: [10, 20, 30, 40],
      },
    ],
  }
</script>

<style lang="scss" scoped>
  .in-severity-chart {
    --chart-sequence-00: var(--severity-color--low);
    --chart-sequence-01: var(--severity-color--medium);
    --chart-sequence-02: var(--severity-color--high);
    --chart-sequence-03: var(--severity-color--critical);
  }
</style>