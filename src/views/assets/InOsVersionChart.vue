<template>
  <div class="in-version-chart">
    <ep-chart
      ref="versionChart"
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import Highcharts from 'highcharts'
  import { windowsVersions, macOSVersions, linuxDistributions } from '@/utils/helpers.js'

  const store = useStore()
  const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
  const leftPanelCollapsedUser = computed(() => store.state.leftPanelCollapsedUser)
  const rightPanelOpen = computed(() => store.state.rightPanelOpen)

  const categories = [
    'Windows',
    'macOS',
    'Linux',
  ]
  const data = [
    {
      y: 60,
      className: 'windows',
      // color: colors[2],
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
      className: 'macos',
      // color: colors[3],
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
      className: 'linux',
      // color: colors[5],
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
  ]

  const browserData = []
  const versionsData = []
  const dataLen = data.length

  let i
  let j
  let drillDataLen
  let brightness

  // Build the data arrays
  for (i = 0; i < dataLen; i += 1) {

    // add browser data
    browserData.push({
      name: categories[i],
      y: data[i].y,
      className: data[i].className
    })

    // add version data
    drillDataLen = data[i].drilldown.data.length
    for (j = 0; j < drillDataLen; j += 1) {
      const name = data[i].drilldown.categories[j]
      brightness = 0.2 - (j / drillDataLen) / 5
      versionsData.push({
        name,
        y: data[i].drilldown.data[j],
        className: `${data[i].className}-version-${j}`,
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

  const versionChart = ref(null)

  watch([
    leftPanelCollapsed,
    leftPanelCollapsedUser,
    rightPanelOpen
  ], () => {
    if (versionChart.value) {
      versionChart.value.reflowChart()
    }
  })
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

    $windows: hsl(191, 86%, 41%);
    $macos: hsl(8, 49%, 49%);
    $linux: hsl(292, 36%, 43%);

    :deep(.windows) {
      fill: $windows;
    }

    :deep(.windows-version-0) {
      fill: lighten($windows, 10%);
    }

    :deep(.windows-version-1) {
      fill: lighten($windows, 20%);
    }

    :deep(.windows-version-2) {
      fill: lighten($windows, 30%);
    }

    :deep(.macos) {
      fill: $macos;
    }

    :deep(.macos-version-0) {
      fill: lighten($macos, 10%);
    }

    :deep(.macos-version-1) {
      fill: lighten($macos, 15%);
    }

    :deep(.macos-version-2) {
      fill: lighten($macos, 20%);
    }

    :deep(.macos-version-3) {
      fill: lighten($macos, 25%);
    }

    :deep(.macos-version-4) {
      fill: lighten($macos, 30%);
    }

    :deep(.linux) {
      fill: $linux;
    }

    :deep(.linux-version-0) {
      fill: lighten($linux, 10%);
    }

    :deep(.linux-version-1) {
      fill: lighten($linux, 20%);
    }
  }
</style>
