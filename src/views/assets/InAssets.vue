<template>
  <div class="assets">
    <ep-container v-bind="headerContainerProps">
      <ep-flex-container
        flex-flow="row nowrap"
        gap="6rem"
      >
        <ep-container v-bind="chartContainerProps">
          <template #header>
            <ep-header>
              <template #left>
                <h1>Vulnerabilties by Severity</h1>
              </template>
            </ep-header>
          </template>
          <in-severity-chart />
        </ep-container>
        <ep-container v-bind="chartContainerProps">
          <template #header>
            <ep-header>
              <template #left>
                <h1>Operating System</h1>
              </template>
            </ep-header>
          </template>
          <in-os-version-chart />
        </ep-container>
        <ep-container v-bind="chartContainerProps">
          <template #header>
            <ep-header>
              <template #left>
                <h1>Vulnerabilties by Type</h1>
              </template>
            </ep-header>
          </template>
          <in-vuln-trend-chart />
        </ep-container>
      </ep-flex-container>
    </ep-container>
    <ep-header v-bind="contentHeaderProps">
      <template #left>
        <!-- <h1>{{ currentPageDisplay }} of {{ visibleData.length }} assets</h1> -->
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
    </ep-header>
    <in-sidebar-layout v-bind="layoutStyles">
      <template #sidebar>
        <div class="sidebar">
          <ep-flex-container
            flex-flow="column nowrap"
            gap="3rem"
            padding="1rem 0"
          >
            <ep-dropdown
              v-bind="columnFiltersDropdownProps"
              style="margin-left: -0.3rem;"
            >
              <template #content>
                <ep-container v-bind="containerProps">
                  <ep-flex-container
                    flex-flow="column nowrap"
                    gap="1rem"
                  >
                    <ep-checkbox
                      v-for="filter in columnFilters"
                      :key="filter.id"
                      v-bind="filter"
                      v-model="filter.checked"
                      @update:model-value="handleFilter($event, filter.id)"
                    />
                  </ep-flex-container>
                </ep-container>
              </template>
            </ep-dropdown>
            <h1>{{ currentPageDisplay }} of {{ visibleData.length }} assets</h1>
            <ep-table-checkbox-filters
              :filters="filters"
              @update:filters="onFilterChange"
            />
          </ep-flex-container>
        </div>
      </template>
      <template #content>
        <ep-empty-state
          v-if="paginatedData.length === 0"
          style="height: 100%;"
        >
          <p>No assets found</p>
          <template #subtext>
            <p>Try adjusting your filters</p>
          </template>
        </ep-empty-state>
        <ep-table
          v-else
          ref="tableComponent"
          :columns="visibleColumns"
          :data="paginatedData"
          v-bind="tableProps"
          @row-click="onRowClick"
        >
          <template #header="{ column, cellWidths, columnIndex }">
            <ep-table-sortable-header
              :column="column"
              :sort-column="sortColumn"
              :sort-order="sortOrder"
              :cell-widths="cellWidths"
              :column-index="columnIndex"
              @sort="sortBy"
            />
          </template>
        </ep-table>
        <ep-table-pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :show-pages="true"
          :results-per-page="pageSize"
          :style="{
            '--ep-table-pagination-padding': '0 3rem'
          }"
          @page-change="onPageChange"
          @update:results-per-page="onPageSizeChange"
        />
      </template>
    </in-sidebar-layout>
  </div>
</template>

<script setup>
  import { computed, inject, ref, onMounted, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import EpEmptyState from '@ericpitcock/epicenter-vue-components/src/components/empty-state/EpEmptyState.vue'
  import InSeverityChart from './InSeverityChart.vue'
  import InVulnTrendChart from './InVulnTrendChart.vue'
  import InOsVersionChart from './InOsVersionChart.vue'
  import { assetColumns } from '../../store/assetData.js'
  import {
    useExclude,
    useColumnFilters,
    useDataFilters,
    useSorting,
    usePagination,
    useSearch
  } from '@epicenter/composables/index.js'

  const search = ref([])

  const store = useStore()
  const router = useRouter()
  const { commonPageHeaderProps } = store.state.commonProps

  const layoutStyles = {
    styles: {
      '--in-sidebar-sidebar-padding': '2rem 0 0 3rem',
      '--in-sidebar-content-padding': '0 0 30rem 0',
    }
  }

  const containerProps = {
    styles: {
      '--ep-container-bg-color': 'var(--interface-overlay)',
      '--ep-container-border-radius': 'var(--border-radius)',
      '--ep-container-border-color': 'var(--border-color--lighter)',
      '--ep-container-padding': '2rem',
    }
  }

  const fixedHeader = ref(false)

  const hiddenColumns = [
    'id'
  ]

  const tableProps = computed(() => {
    return {
      hiddenColumns,
      bordered: true,
      headerBackgroundColor: 'var(--interface-surface)',
      selectable: true,
      fixedHeader: fixedHeader.value,
      striped: true,
      styles: {
        '--ep-table-width': 'max-content',
        '--ep-table-min-width': '100%',
        '--ep-table-head-width': 'max-content',
        '--ep-table-body-width': 'max-content',
        '--ep-table-container-min-width': '100%',
        '--ep-table-container-overflow': 'auto',
        '--ep-table-container-padding': '1rem 3rem 0 3rem',
        '--ep-table-fixed-top': '102px',
        '--ep-table-cell-white-space': 'nowrap',
      },
    }
  })

  const tableComponent = ref(null)

  const onScroll = (scrollTop) => {
    const table = tableComponent.value.$refs.tableContainer

    if (!fixedHeader.value && scrollTop > 452) {
      fixedHeader.value = true
      table.style.paddingTop = '54.5px'
    }
    if (fixedHeader.value && scrollTop < 452) {
      fixedHeader.value = false
      table.style.paddingTop = '10px'
    }
  }

  // inject scroll position of .content from InGrid.vue
  const contentScrollTop = inject('contentScrollTop')

  watch(() => contentScrollTop.value, () => {
    onScroll(contentScrollTop.value)
  })

  const multiSearchProps = {
    height: '3.8rem',
    backgroundColor: 'var(--interface-foreground)',
    icon: {
      name: 'search',
      styles: {
        '--ep-icon-width': '2.4rem',
      },
    },
    placeholder: 'Search assets',
  }

  const assetColumnsRef = ref(assetColumns)
  const assetDataRef = ref(store.state.assets)

  const {
    includedColumns,
    includedData
  } = useExclude(assetColumnsRef, assetDataRef, [])

  const {
    sortedData,
    sortBy,
    sortColumn,
    sortOrder
  } = useSorting(includedData, 'risk_score', 'desc')

  onMounted(() => {
    const columnsToFilter = ['location', 'operating_system', 'status', 'endpoint_version']
    const disabledFilters = ['Archived', 'Inactive']

    generateFilters(columnsToFilter, disabledFilters)
  })

  const {
    filters,
    generateFilters,
    filteredData,
    onFilterChange
  } = useDataFilters(includedColumns, sortedData)

  const disabledColumns = [
    'ipv6_address',
    'mac_address',
    'last_seen',
    'os_version',
    'endpoint_version',
    'status',
  ]

  const {
    columnFilters,
    visibleColumns,
    visibleData,
    handleFilter
  } = useColumnFilters(includedColumns, disabledColumns, filteredData)

  const columnFiltersDropdownProps = {
    buttonProps: {
      label: 'Columns',
      variant: 'secondary',
      iconLeft: { name: 'f-columns' },
    }
  }

  // use search
  const {
    searchedData,
    searchText,
    updateSearchText
  } = useSearch(visibleData)

  // use pagination
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    onPageChange,
    onPageSizeChange
  } = usePagination(searchedData, 1, 20)

  // showing the number of assets in the header, for example "Showing 1-30 of 100 assets"
  const totalAssets = computed(() => paginatedData.length)
  const currentPageDisplay = computed(() => {
    const start = (currentPage.value - 1) * 30 + 1
    const end = currentPage.value * 30
    return `${start}–${end}`
  })

  const contentHeaderProps = computed(() => ({
    styles: {
      ...commonPageHeaderProps.styles,
      '--ep-header-left-flex': '0 0 20rem',
      '--ep-header-left-padding': '0 3rem',
      '--ep-header-center-flex': '1',
      '--ep-header-center-padding': '0 3rem 0 0',
      '--ep-header-content-gap': '0',
    }
  }))

  const headerContainerProps = {
    styles: {
      '--ep-container-bg-color': 'var(--page-header-background)',
      '--ep-container-border-radius': '0',
      '--ep-container-padding': '2rem 4rem 0 4rem',
      position: 'sticky',
      top: '0',
    }
  }

  const chartContainerProps = {
    styles: {
      '--ep-container-content-padding': '3rem 0',
    }
  }

  const onRowClick = (row) => {
    store.commit('addSelectedAsset', row.id)
    router.push({ path: `/assets/${row.id}` })
  }

  const updateSearch = (value) => {
    search.value = value
  }

  const queryClose = (query) => {
    search.value = search.value.filter(item => item !== query)
  }
</script>

<style lang="scss" scoped>
  .assets {
    .ep-header {
      box-shadow: 0 -10px 10px rgba(31, 31, 31, 0.5);
    }

    .text-style--section:not(:first-child) {
      margin-top: 1rem;
    }

    :deep(.highcharts-series-inactive),
    :deep(.highcharts-series-hover),
    :deep(.highcharts-point-inactive),
    :deep(.highcharts-point-hover) {
      opacity: 1 !important;
      fill-opacity: 1 !important;
    }

    :deep(.in-sidebar-layout .sidebar-layout__content) {
      overflow-x: auto;
    }
  }
</style>
