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
    <sidebar-layout>
      <template #sidebar>
        <!-- <ep-checkbox
          v-for="filter in filters"
          :key="filter.id"
          v-bind="filter"
          @checkchange="handleFilter"
        /> -->
      </template>
      <template #content>

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
              </template>
            </ep-header>
          </template>
          <ep-chart :options="vulnChartOptions" />
        </ep-container>
        <ep-container
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
        >
          <ep-table
            :columns="vulnTableColumns"
            :data="vulnTableData"
            v-bind="tableProps"
            style="width: 100%;"
          />
        </ep-container>
      </template>
    </sidebar-layout>
  </div>
</template>

<script>
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import { mapState } from 'vuex'
  import vulnChartOptions from './vulnChartOptions.js'
  import { vulnTableColumns, vulnTableData } from './vulnData.js'

  export default {
    name: 'Vulnerabilities',
    components: {
      SidebarLayout
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
        hiddenColumns: [],
        vulnChartOptions,
        tableProps: {
          bordered: true,
          // stickyHeader: true,
          // stickyTop: 61,
          sortable: true,
          width: '100%',
          exclude: [],
        },
        vulnTableColumns,
        vulnTableData,
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
        'commonHeaderProps',
        'commonFooterProps',
        'leftPanelCollapsed',
        'rightPanelOpen',
      ]),
      filters() {
        const filters = this.vulnTableColumns.map(column => {
          return {
            id: column.key,
            name: 'columns',
            value: column.key,
            checked: !this.hiddenColumns.includes(column.key),
            label: column.header,
            disabled: false,
          }
        })
        // remove everything from this.tablesProps.exclude
        return filters.filter(filter => !this.tableProps.exclude.includes(filter.id))
      }
    },
    watch: {
      leftPanelCollapsed() {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      },
      rightPanelOpen() {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vulnerabilities {
    --chart-sequence-00: var(--severity-color--low);
    --chart-sequence-01: var(--severity-color--medium);
    --chart-sequence-02: var(--severity-color--high);
    --chart-sequence-03: var(--severity-color--critical);

    // display: flex;
    // flex-direction: column;
    // gap: 2rem;
    // height: 100%;
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

    :deep(.ep-table-container) {
      // overflow: revert;
      overflow-x: auto;
    }
  }
</style>