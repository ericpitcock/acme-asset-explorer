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
    <sidebar-layout sidebar-padding="2rem 0 0 3rem">
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
              :key="severity.id"
              :value="severity.value"
              :label="severity.label"
              :checked="severity.checked"
              :disabled="severity.disabled"
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
            <ep-header>
              <template #left>
                <h1>Severity Over Time</h1>
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
  import { ref, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import vulnChartOptions from './vulnChartOptions.js'
  import { vulnTableColumns, vulnTableData } from './vulnData.js'

  export default {
    name: 'Vulnerabilities',
    components: {
      SidebarLayout,
    },
    setup() {
      const store = useStore()
      const commonPageHeaderProps = store.state.commonPageHeaderProps
      const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
      const rightPanelOpen = computed(() => store.state.rightPanelOpen)
      const commonContainerProps = computed(() => store.state.commonContainerProps)

      const filters = ref([])
      const multiSearchProps = {
        height: '3.8rem',
        backgroundColor: 'var(--interface-foreground)',
        icon: { name: 'search' },
        placeholder: 'Multi Search - Enter to search - Use quotes for exact match, e.g. "active"',
      }
      const tableProps = {
        bordered: true,
        stickyHeader: true,
        stickyTop: '61',
        sortable: true,
        width: '100%',
        exclude: [],
      }

      const filteredVulnData = computed(() => {
        return vulnTableData.filter(row => {
          return !filters.value.includes(row.baseSeverity.props.label.toLowerCase())
        })
      })

      const headerProps = computed(() => ({
        ...commonPageHeaderProps,
        leftFlex: '0 0 20rem',
        centerFlex: '1',
        rightFlex: '0 0 20rem',
        rightPadding: '0 3rem',
        itemGap: '0',
      }))

      const severityFilters = computed(() => {
        const severityLevels = ['Low', 'Medium', 'High', 'Critical']
        return severityLevels.map(severity => {
          return {
            id: severity.toLowerCase(),
            name: 'severity',
            value: severity.toLowerCase(),
            checked: !filters.value.includes(severity.toLowerCase()),
            label: severity,
            disabled: false,
          }
        })
      })

      const handleFilter = (event) => {
        if (event.target.checked === false) {
          filters.value.push(event.target.id)
        } else {
          filters.value = filters.value.filter(filter => filter !== event.target.id)
        }
      }

      const updateSearch = (query) => {
        console.log('searching for:', query)
      }

      const queryClose = () => {
        console.log('query closed')
      }

      watch(() => leftPanelCollapsed.value, () => {
        window.dispatchEvent(new Event('resize'))
      })

      watch(() => rightPanelOpen.value, () => {
        window.dispatchEvent(new Event('resize'))
      })

      return {
        commonContainerProps,
        filters,
        multiSearchProps,
        tableProps,
        vulnChartOptions,
        vulnTableColumns,
        filteredVulnData,
        headerProps,
        severityFilters,
        handleFilter,
        updateSearch,
        queryClose,
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
      overflow-x: auto;
    }
  }
</style>
