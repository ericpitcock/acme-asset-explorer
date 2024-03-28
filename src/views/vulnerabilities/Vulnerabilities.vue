<template>
  <div class="vulnerabilities">
    <ep-container
      v-bind="commonContainerProps"
      content-padding="3rem 0 1rem 0"
    >
      <template #header>
        <ep-header v-bind="commonHeaderProps">
          <template #left>
            <h1>Vulnerabilities Over Time</h1>
          </template>
          <template #right>
            <ep-date-picker
              mode="range"
              positionX="right"
              :inputProps="{
                size: 'large',
                backgroundColor: 'var(--interface-foreground)'
              }"
            />
          </template>
        </ep-header>
      </template>
      <ep-chart
        :options="vulnChartOptions"
        :chart-colors="null"
      />
    </ep-container>
    <ep-container
      v-bind="commonContainerProps"
      container-padding="3rem"
    >
      <ep-table
        :columns="tableColumns"
        :data="vulnData"
        v-bind="tableProps"
      />
    </ep-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
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
          stickyHeader: true,
          stickyTop: 0
        }
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
        'commonHeaderProps',
        'commonFooterProps'
      ])
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

    > *:not(:first-child) {
      margin-top: 2rem;
    }
  }
</style>