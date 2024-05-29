<template>
  <div class="vulnerabilities">
    <ep-container v-bind="headerContainerProps">
      <template #header>
        <ep-header
          height="9.1rem"
          border-width="0"
        >
          <template #left>
            <h1 class="page-head">
              Vulnerabilities
            </h1>
          </template>
          <template #right>
            <ep-date-picker
              mode="range"
              position-x="right"
              :input-props="{
                size: 'large',
                backgroundColor: 'var(--interface-foreground)'
              }"
            />
          </template>
        </ep-header>
      </template>
      <ep-container v-bind="chartContainerProps">
        <template #header>
          <ep-header>
            <template #left>
              <h1>Severity Over Time</h1>
            </template>
          </ep-header>
        </template>
        <ep-chart
          :options="vulnChartOptions"
          :height="300"
        />
      </ep-container>
    </ep-container>
    <ep-header v-bind="contentHeaderProps">
      <template #left>
        <h1>{{ vulnTableData.length }} Vulnerabilities</h1>
      </template>
      <template #center>
        <ep-multi-search
          v-bind="multiSearchProps"
          v-model="search"
          @enter="updateSearch"
          @delete="updateSearch"
          @query-close="queryClose"
          @clear="updateSearch"
        />
      </template>
    </ep-header>
    <in-sidebar-layout sidebar-padding="2rem 0 0 3rem">
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
          max-width="fit-content"
          container-padding="1rem 3rem 3rem"
        >
          <ep-table
            :columns="visibleColumns"
            :data="visibleData"
            v-bind="tableProps"
            :search="search"
            :hidden-columns="hiddenColumns"
            style="width: 100%; overflow: unset;"
            @row-click="handleRowClick"
          />
        </ep-container>
      </template>
    </in-sidebar-layout>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import vulnChartOptions from './vulnChartOptions.js'
  import { vulnTableColumns, vulnTableData } from '../../store/vulnData.js'
  import useExclude from '@epicenter/components/table/useExclude.js'
  import useSorting from '@epicenter/components/table/useSorting.js'
  import useDataFilters from '@epicenter/components/table/useDataFilters.js'
  import useColumnFilters from '@epicenter/components/table/useColumnFilters.js'
  import EpTableSortableHeader from '@epicenter/components/table/EpTableSortableHeader.vue'

  // export default {
  defineOptions({
    name: 'InVulnerabilities',
  })
  // components: {
  //   InSidebarLayout,
  // },
  // setup() {
  const store = useStore()
  const commonPageHeaderProps = store.state.commonProps.commonPageHeaderProps
  const commonContainerProps = computed(() => store.state.commonProps.commonContainerProps)
  const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
  const leftPanelCollapsedUser = computed(() => store.state.leftPanelCollapsedUser)
  const rightPanelOpen = computed(() => store.state.rightPanelOpen)

  const router = useRouter()
  const route = useRoute()
  const search = ref(route.query.id ? [route.query.id] : []) // Use route.query.id instead of router.currentRoute.value.query.id

  // const hiddenColumns = ref(['published_date', 'last_modified_date', 'date_seen'])

  const multiSearchProps = {
    height: '3.8rem',
    backgroundColor: 'var(--interface-foreground)',
    icon: { name: 'search' },
    placeholder: 'Search vulnerabilities',
  }

  // const tableProps = {
  //   bordered: true,
  //   searchable: true,
  //   selectable: true,
  //   sortable: true,
  //   stickyHeader: true,
  //   stickyTop: '61',
  //   striped: true,
  //   width: '100%',
  //   exclude: [],
  // }

  const contentHeaderProps = computed(() => ({
    ...commonPageHeaderProps,
    leftFlex: '0 0 20rem',
    leftPadding: '0 3rem',
    centerFlex: '1',
    centerPadding: '0 3rem 0 0',
    itemGap: '0',
  }))

  const headerContainerProps = computed(() => ({
    backgroundColor: 'var(--page-header-background)',
    borderWidth: '0',
    containerPadding: '0 4rem',
    // contentPadding: '2rem 0 0 0',
  }))

  const chartContainerProps = {
    borderWidth: 'none',
    contentPadding: '3rem 0',
  }

  const handleRowClick = (row) => {
    store.commit('addSelectedVulnerability', row)
    router.push({ path: `/vulnerabilities/${row.id}` })
  }

  const updateSearch = (value) => {
    search.value = value
  }

  const queryClose = (query) => {
    search.value = search.value.filter(item => item !== query)
  }

  watch([
    leftPanelCollapsed,
    leftPanelCollapsedUser,
    rightPanelOpen
  ], () => {
    window.dispatchEvent(new Event('resize'))
  })

  // new
  const vulnTableColumnsRef = ref(vulnTableColumns)
  const vulnTableDataRef = ref(vulnTableData)

  const {
    includedColumns,
    includedData
  } = useExclude(vulnTableColumnsRef, vulnTableDataRef, ['id'])

  const {
    sortedData,
    sortBy,
    sortColumn,
    sortOrder
  } = useSorting(includedData, 'user', 'desc')

  onMounted(() => {
    const columnsToFilter = ['severity']
    const disabledFilters = []

    generateFilters(columnsToFilter, disabledFilters)
  })

  const {
    filters,
    generateFilters,
    filteredData
  } = useDataFilters(includedColumns, sortedData)

  const hiddenColumns = [
    'published_date',
    'last_modified_date',
    'date_seen'
  ]

  const {
    columnFilters,
    visibleColumns,
    visibleData,
    handleFilter
  } = useColumnFilters(includedColumns, hiddenColumns, filteredData)

  const tableProps = {
    // columns: includedColumns.value,
    // data: sortedData.value,
    bordered: true,
    headerBackgroundColor: 'var(--interface-surface)',
    selectable: true,
    stickyHeader: true,
    stickyTop: '61',
    // calculateHeight: true,
    // calculateHeightOffset: 81,
    striped: true,
    styles: {
      '--ep-table-width': '100%',
      '--ep-table-sticky-top': '61px',
      '--ep-table-container-overflow': 'unset'
    }
  }

  // onMounted(() => {
  //   const columnsToFilter = ['severity']
  //   const disabledFilters = []
  //   const customSortOrder = {
  //     'severity': ['Critical', 'High', 'Medium', 'Low']
  //   }

  //   generateFilters(columnsToFilter, disabledFilters, customSortOrder)

  // })

  // const { filters, generateFilters, filteredData } = useFilters(vulnTableColumns, vulnTableDataRef)

  // return {
  //   chartContainerProps,
  //   commonContainerProps,
  //   contentHeaderProps,
  //   filteredData,
  //   filters,
  //   generateFilters,
  //   handleRowClick,
  //   headerContainerProps,
  //   hiddenColumns,
  //   multiSearchProps,
  //   queryClose,
  //   search,
  //   tableProps,
  //   updateSearch,
  //   vulnChartOptions,
  //   vulnTableColumns,
  //   vulnTableData,
  // }
  // },
  // }
</script>

<style lang="scss" scoped>
  .vulnerabilities {
    --chart-sequence-00: var(--color-severity--low-bg);
    --chart-sequence-01: var(--color-severity--medium-bg);
    --chart-sequence-02: var(--color-severity--high-bg);
    --chart-sequence-03: var(--color-severity--critical-bg);

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
