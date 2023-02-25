<template>
  <div class="vulnerabilities">
    <ep-header
      height="5.1rem"
      padding="0"
      borderWidth="1px"
    >
      <template #left>
        <h1 class="font-size--large">Vulnerabilities</h1>
      </template>
      <template #right>
        <ep-date-picker mode="range" />
      </template>
    </ep-header>
    <ep-chart
      :options="vulnChartOptions"
      :chartColors="null"
    />
  </div>
  <div>
    <ep-table
      :columns="tableColumns"
      :data="vulnData"
      v-bind="tableProps"
    />
  </div>
</template>

<script>
  import vulnChartOptions from './vulnChartOptions'
  import * as vulnData from './vulnData'

  export default {
    name: 'Vulnerabilities',
    components: {
    },
    data() {
      return {
        vulnChartOptions,
        vulnData: vulnData.default,
        tableColumns: [
          {
            header: 'ID',
            key: 'id'
          },
          {
            header: 'Description',
            key: 'description',
            formatter: (value) => {
              return value.substring(0, 300)
            }
          },
          {
            header: 'Base Score',
            key: 'baseScore'
          },
          {
            header: 'Base Severity',
            key: 'baseSeverity'
          },
          {
            header: 'Published Date',
            key: 'publishedDate'
          },
          {
            header: 'Last Modified Date',
            key: 'lastModifiedDate'
          }
        ],
        tableProps: {
          bordered: true,
          verticalAlign: 'top',
        }
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .vulnerabilities {
    padding: 3rem;

    // give every child element a margin-top of 3rem except the first child
    > * {
      margin-top: 3rem;

      &:first-child {
      margin-top: 0;
    }
  }
}</style>