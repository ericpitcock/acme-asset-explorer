<template>
  <div class="in-vuln-trend-chart">
    <ep-chart
      ref="vulnTrendChart"
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import Highcharts from 'highcharts'

  const store = useStore()
  const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
  const leftPanelCollapsedUser = computed(() => store.state.leftPanelCollapsedUser)
  const rightPanelOpen = computed(() => store.state.rightPanelOpen)

  const fakeArrayOfDates = (length) => {
    let arr = []
    let date = new Date()
    for (let i = 0; i < length; i++) {
      arr.push(date.getTime())
      date.setDate(date.getDate() - 1)
    }
    return arr.reverse()
  }

  const colors = Highcharts.getOptions().colors
  const categories = [
    'Buffer Overflow',
    'SQL Injection',
    'Cross-site Scripting (XSS)',
    'Other'
  ]
  const data = [
    {
      name: 'Buffer Overflow',
      data: [38, 29, 27, 12]
    },
    {
      name: 'SQL Injection',
      data: [25, 40, 20, 20]
    },
    {
      name: 'Cross-site Scripting (XSS)',
      data: [18, 22, 27, 32]
    },
    {
      name: 'Other',
      data: [30, 20, 25, 25]
    }
  ]


  const chartOptions = {
    chart: {
      type: 'area',
      styledMode: true,
    },
    xAxis: {
      categories: fakeArrayOfDates(30),
      labels: {
        formatter: function() {
          // let value = this.value
          var value = new Date(this.value)
          return value.toLocaleDateString({
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        },
      },
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Percentage'
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: '%'
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    series: data.map(item => ({
      name: item.name,
      data: item.data,
      color: colors[data.indexOf(item)],
      lineWidth: 1,
      marker: {
        enabled: true,
        symbol: 'circle',
        radius: 2
      }
    }))
  }

  const vulnTrendChart = ref(null)

  watch([
    leftPanelCollapsed,
    leftPanelCollapsedUser,
    rightPanelOpen
  ], () => {
    if (vulnTrendChart.value) {
      vulnTrendChart.value.reflowChart()
    }
  })
</script>

<style lang="scss" scoped>
  .in-vuln-trend-chart {
    --chart-sequence-00: var(--color-severity--low-bg);
    --chart-sequence-01: var(--color-severity--medium-bg);
    --chart-sequence-02: var(--color-severity--high-bg);
    --chart-sequence-03: var(--color-severity--critical-bg);

    :deep(.highcharts-area) {
      fill-opacity: 1;
    }
  }
</style>
