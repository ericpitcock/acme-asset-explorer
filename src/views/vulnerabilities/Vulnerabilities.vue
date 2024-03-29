<template>
  <div class="vulnerabilities">
    <ep-header v-bind="headerProps">
      <template #left>
        <p>Vulnerabilities</p>
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
    <ep-container
      v-bind="commonContainerProps"
      content-padding="3rem 0 1rem 0"
    >
      <template #header>
        <ep-header v-bind="commonHeaderProps">
          <template #left>
            <h1>Severity Over Time</h1>
          </template>
          <template #right>
            <!-- <ep-date-picker
              mode="range"
              positionX="right"
              :inputProps="{
                size: 'large',
                backgroundColor: 'var(--interface-foreground)'
              }"
            /> -->
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
        headerProps: {
          backgroundColor: 'var(--interface-surface)',
          leftFlex: '0 0 10rem',
          centerFlex: '1',
          rightFlex: '0 0 10rem',
          sticky: true,
          stickyTop: '0',
          padding: '0 3rem',
          zIndex: 'var(--z-index--fixed)',
        },
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
          stickyTop: 0,
          sortable: true,
        }
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
        'commonHeaderProps',
        'commonFooterProps',
        'leftPanelOpen',
        'rightPanelOpen',
      ])
    },
    // watch leftPanelOpen and rightPanelOpen for changes and update the chart as if the window was resized
    watch: {
      leftPanelOpen() {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      },
      rightPanelOpen() {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vulnerabilities {
    --chart-sequence-00: var(--severity-color--low);
    --chart-sequence-01: var(--severity-color--medium);
    --chart-sequence-02: var(--severity-color--high);
    --chart-sequence-03: var(--severity-color--critical);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;

    // // padding: 3rem;
    // > *:not(:first-child) {
    //   margin-top: 2rem;
    // }
    :deep(.highcharts-legend-item-hidden text tspan) {
      fill: var(--text-color--subtle) !important;
    }

    :deep(.highcharts-xaxis-labels text),
    :deep(.highcharts-yaxis-labels text) {
      font-size: var(--font-size--xsmall);
      fill: var(--text-color--subtle) !important;
    }
  }
</style>