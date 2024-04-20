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
  import { windowsVersions, macOSVersions, linuxDistributions } from '@/utils/helpers.js'

  const colors = Highcharts.getOptions().colors

  const categories = [
    'Windows',
    'macOS',
    'Linux',
    // 'Firefox',
    // 'Other'
  ],
    data = [
      {
        y: 60,
        color: colors[2],
        drilldown: {
          name: 'Windows',
          categories: windowsVersions,
          data: [
            25,
            20,
            15,
            // 5,
            // 5,
          ]
        }
      },
      {
        y: 30,
        color: colors[3],
        drilldown: {
          name: 'macOS',
          categories: macOSVersions,
          data: [
            16,
            5,
            4,
            3,
            2,
          ]
        }
      },
      {
        y: 10,
        color: colors[5],
        drilldown: {
          name: 'Linux',
          categories: linuxDistributions,
          data: [
            8,
            2,
            // 1,
            // 1,
            // 1,
          ]
        }
      },
    ],
    browserData = [],
    versionsData = [],
    dataLen = data.length

  let i,
    j,
    drillDataLen,
    brightness

  // Build the data arrays
  for (i = 0; i < dataLen; i += 1) {

    // add browser data
    browserData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    })

    // add version data
    drillDataLen = data[i].drilldown.data.length
    for (j = 0; j < drillDataLen; j += 1) {
      const name = data[i].drilldown.categories[j]
      brightness = 0.2 - (j / drillDataLen) / 5
      versionsData.push({
        name,
        y: data[i].drilldown.data[j],
        color: Highcharts.color(data[i].color).brighten(brightness).get(),
        custom: {
          version: name.split(' ')[1] || name.split(' ')[0]
        }
      })
    }
  }

  // Create the chart
  const chartOptions = {
    chart: {
      type: 'pie',
      styledMode: true
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%']
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
      name: 'Operating Systems',
      data: browserData,
      size: '45%',
      dataLabels: {
        color: '#ffffff',
        distance: '-50%'
      }
    }, {
      name: 'Versions',
      data: versionsData,
      size: '80%',
      innerSize: '60%',
      dataLabels: {
        enabled: false // Remove data labels
      },
      // dataLabels: {
      //   format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
      //   filter: {
      //     property: 'y',
      //     operator: '>',
      //     value: 1
      //   },
      //   style: {
      //     fontWeight: 'normal'
      //   }
      // },
      id: 'versions'
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 400
        },
        chartOptions: {
          series: [{
          }, {
            id: 'versions',
            dataLabels: {
              distance: 10,
              format: '{point.custom.version}',
              filter: {
                property: 'percentage',
                operator: '>',
                value: 2
              }
            }
          }]
        }
      }]
    }
  }
</script>


<style lang="scss" scoped>
  .in-version-chart {
    :deep(.highcharts-point) {
      stroke: var(--interface-bg) !important;
      stroke-width: 2px !important;
    }

    :deep(.highcharts-container text) {
      fill: var(--text-color--loud) !important;
    }

    // --chart-sequence-00: var(--severity-color--low);
    // --chart-sequence-01: var(--severity-color--medium);
    // --chart-sequence-02: var(--severity-color--high);
    // --chart-sequence-03: var(--severity-color--critical);
  }
</style>
