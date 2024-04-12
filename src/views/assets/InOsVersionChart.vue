<template>
  <div class="in-version-chart">
    <ep-chart
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>

<script setup>
  import Highcharts from 'highcharts'

  // const colors = Highcharts.getOptions().colors

  const data = [{
    name: 'macOS',
    y: 45.5,
    // color: colors[0],
    versions: ['macOS v12.0', 'macOS v11.0', 'macOS v10.0']
  },
  {
    name: 'Windows',
    y: 35.3,
    // color: colors[1],
    versions: ['Windows 11', 'Windows 10', 'Windows 8']
  },
  {
    name: 'Linux',
    y: 19.2,
    // color: colors[2],
    versions: ['Ubuntu 22.04', 'Ubuntu 20.04', 'Ubuntu 18.04']
  }]

  const chartOptions = {
    chart: {
      type: 'pie',
      styledMode: true,
      width: null, // Remove fixed width
      height: null, // Remove fixed height
      events: {
        render() {
          this.reflow() // Make the chart responsive on render
        }
      }
    },
    // credits: {
    //   enabled: false
    // },
    // title: {
    //   text: undefined
    // },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%']
      },
      series: {
        animation: {
          duration: 500,
        },
        borderRadius: {
          radius: 0
        },
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
      name: 'Operating Systems',
      data: data.map(os => ({
        name: os.name,
        y: os.y,
        color: os.color,
        drilldown: os.versions.map(version => ({
          name: version,
          y: 100 / os.versions.length,
          color: Highcharts.color(os.color).brighten(0.2).get(),
        }))
      })),
      size: '80%',
      innerSize: '60%',
      dataLabels: {
        format: '<b>{point.name}:</b> <span style="opacity: 0.5">{point.y}%</span>',
        filter: {
          property: 'y',
          operator: '>',
          value: 1
        },
        style: {
          fontWeight: 'normal'
        }
      }
    }],
  }
</script>

<style lang="scss" scoped>
  .in-version-chart {
    width: 100%;
    // --chart-sequence-00: var(--severity-color--low);
    // --chart-sequence-01: var(--severity-color--medium);
    // --chart-sequence-02: var(--severity-color--high);
    // --chart-sequence-03: var(--severity-color--critical);
  }
</style>
