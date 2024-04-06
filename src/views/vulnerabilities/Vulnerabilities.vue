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
          gap="1.5rem"
          padding="1rem 0"
        >
          <template
            v-for="(filterSet, category) in filters"
            :key="category"
          >
            <h3 class="text-style--section">
              {{ category.replace(/_/g, ' ') }}
            </h3>
            <ep-checkbox
              v-for="checkbox in filterSet"
              :key="checkbox.label"
              v-bind="checkbox"
              v-model="checkbox.checked"
            />
          </template>
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
            :data="filteredData"
            :hiddenColumns="hiddenColumns"
            v-bind="tableProps"
            style="width: 100%; overflow: unset;"
          />
        </ep-container>
      </template>
    </sidebar-layout>
  </div>
</template>

<script>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import vulnChartOptions from './vulnChartOptions.js'
  import { vulnTableColumns, vulnTableData } from './vulnData.js'
  import useFilters from '@/composables/useFilters.js'

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

      const hiddenColumns = ref(['published_date', 'last_modified_date', 'date_seen'])
      const vulnTableDataRef = ref(vulnTableData)

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

      const headerProps = computed(() => ({
        ...commonPageHeaderProps,
        leftFlex: '0 0 20rem',
        centerFlex: '1',
        rightFlex: '0 0 20rem',
        rightPadding: '0 3rem',
        itemGap: '0',
      }))

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

      onMounted(() => {
        const columnsToFilter = ['severity']
        const disabledFilters = ['low']

        generateFilters(columnsToFilter, disabledFilters)
      })

      const { filters, generateFilters, filteredData } = useFilters(vulnTableColumns, vulnTableDataRef)

      return {
        commonContainerProps,
        filters,
        generateFilters,
        hiddenColumns,
        filteredData,
        multiSearchProps,
        tableProps,
        vulnChartOptions,
        vulnTableColumns,
        headerProps,
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
