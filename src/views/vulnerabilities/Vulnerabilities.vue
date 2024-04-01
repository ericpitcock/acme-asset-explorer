<template>
  <div class="vulnerabilities">
    <ep-header v-bind="headerProps">
      <template #left>
        <p>Vulnerabilities</p>
      </template>
      <template #center>
        <ep-multi-search
          v-bind="multiSearchProps"
          @enter="updateSearch"
          @delete="updateSearch"
          @query-close="queryClose"
          @clear="updateSearch"
        />
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
        <ep-flex-container
          flex-flow="column nowrap"
          gap="1rem"
          padding="1rem 0"
        >
          <h3 class="text-style--section">Severity</h3>
          <ep-flex-container
            flex-flow="column nowrap"
            gap="1.5rem"
            padding="1rem 0"
          >
            <ep-checkbox
              v-for="severity in severityFilters"
              :key="severity"
              v-bind="severity"
              @checkchange="handleFilter"
            />
          </ep-flex-container>
        </ep-flex-container>
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
            :data="filteredVulnData"
            v-bind="tableProps"
            style="width: 100%; overflow: unset;"
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
  // import EpFlexContainer from '@ericpitcock/epicenter-vue-components/src/components/flexbox/EpFlexContainer.vue'

  export default {
    name: 'Vulnerabilities',
    components: {
      SidebarLayout,
      // EpFlexContainer,
    },
    data() {
      return {
        headerProps: {
          backgroundColor: 'var(--interface-surface)',
          leftFlex: '0 0 20rem',
          leftPadding: '0 0 0 3rem',
          centerFlex: '1',
          rightFlex: '0 0 20rem',
          rightPadding: '0 3rem',
          sticky: true,
          stickyTop: '0',
          itemGap: '0',
          zIndex: 'var(--z-index--fixed)',
        },
        filters: [],
        hiddenColumns: [],
        multiSearchProps: {
          height: '3.8rem',
          backgroundColor: 'var(--interface-foreground)',
          icon: { name: 'search' },
          placeholder: 'Multi Search - Enter to search - Use quotes for exact match, e.g. "active"',
        },
        tableProps: {
          bordered: true,
          stickyHeader: true,
          stickyTop: '61',
          sortable: true,
          width: '100%',
          exclude: [],
        },
        vulnChartOptions,
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
      filteredVulnData() {
        // for each filter in this.filters, filter the vulnTableData prop severity column
        return this.vulnTableData.filter(row => {
          return !this.filters.includes(row.baseSeverity.value.toLowerCase())
        })
      },
      // filters() {
      //   const filters = this.vulnTableColumns.map(column => {
      //     return {
      //       id: column.key,
      //       name: 'columns',
      //       value: column.key,
      //       checked: !this.hiddenColumns.includes(column.key),
      //       label: column.header,
      //       disabled: false,
      //     }
      //   })
      //   // remove everything from this.tablesProps.exclude
      //   return filters.filter(filter => !this.tableProps.exclude.includes(filter.id))
      // },
      severityFilters() {
        const severityLevels = ['Low', 'Medium', 'High', 'Critical']
        return severityLevels.map(severity => {
          return {
            id: severity.toLowerCase(),
            name: 'severity',
            value: severity.toLowerCase(),
            checked: !this.filters.includes(severity.toLowerCase()),
            label: severity,
            disabled: false,
          }
        })
      },
    },
    methods: {
      handleFilter(event) {
        // if unchecked, add to filters
        if (event.target.checked === false) {
          this.filters.push(event.target.id)
        } else {
          // if checked, remove from filters
          this.filters = this.filters.filter(filter => filter !== event.target.id)
        }
      },
      updateSearch(query) {
        console.log('searching for:', query)
      },
      queryClose() {
        console.log('query closed')
      },
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
    :deep(.highcharts-series-inactive),
    :deep(.highcharts-series-hover),
    :deep(.highcharts-point-hover) {
      opacity: 1 !important;
      fill-opacity: 1 !important;
    }

    :deep(.highcharts-legend-item-hidden text tspan) {
      fill: var(--text-color--subtle) !important;
    }

    :deep(.highcharts-legend-item:hover text) {
      fill: var(--text-color) !important;
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