<template>
  <div class="in-vuln-trend-chart">
    <ep-chart
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>

<script setup>
  import Highcharts from 'highcharts'

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
      data: [35, 25, 20, 15] // Example data for Buffer Overflow vulnerabilities over time
    },
    {
      name: 'SQL Injection',
      data: [20, 30, 25, 25] // Example data for SQL Injection vulnerabilities over time
    },
    {
      name: 'Cross-site Scripting (XSS)',
      data: [15, 20, 30, 35] // Example data for XSS vulnerabilities over time
    },
    {
      name: 'Other',
      data: [30, 25, 25, 25] // Example data for Other vulnerabilities over time
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
</script>

<style lang="scss" scoped>
  .in-vuln-trend-chart {
    --chart-sequence-00: var(--severity-color--low);
    --chart-sequence-01: var(--severity-color--medium);
    --chart-sequence-02: var(--severity-color--high);
    --chart-sequence-03: var(--severity-color--critical);
  }
</style>
