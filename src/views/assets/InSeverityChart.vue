<template>
  <div class="in-severity-chart">
    <ep-chart
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import Highcharts from 'highcharts'

  const store = useStore()
  const vulnerabilities = computed(() => store.state.vulnerabilities)

  // map vulnerabilities.severity to an array of numbers
  const severity = vulnerabilities.value.map((vuln) => vuln.severity.props.label)

  // get the length of each severity level in an array
  const data = [severity.filter((s) => s === 'Low').length, severity.filter((s) => s === 'Medium').length, severity.filter((s) => s === 'High').length, severity.filter((s) => s === 'Critical').length]

  const colors = Highcharts.getOptions().colors
  const categories = [
    'Low',
    'Medium',
    'High',
    'Critical'
  ]
  // highcharts bar chart options
  const chartOptions = {
    chart: {
      type: 'column',
      styledMode: true,
      backgroundColor: 'transparent',
      style: {
        fontFamily: '"Inter var", sans-serif',
      },
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          color: 'var(--text-color--loud)',
          fontSize: 'var(--font-size--default)',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Number of Vulnerabilities',
        style: {
          color: 'var(--text-color--loud)',
          fontSize: 'var(--font-size--default)',
        },
      },
      labels: {
        style: {
          color: 'var(--text-color--subtle)',
          fontSize: 'var(--font-size--small)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: {
          duration: 500,
        },
        borderRadius: {
          radius: 0
        },
        colorByPoint: true,
        colors: colors,
        groupPadding: 0.05,
        // bar width
        // pointWidth: 30,
        // space between bars
        pointPadding: 0.25,
      },
    },
    series: [
      {
        name: 'Vulnerabilities',
        data: data,
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