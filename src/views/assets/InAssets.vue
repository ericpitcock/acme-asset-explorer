<template>
  <div class="assets">
    <ep-container v-bind="headerContainerProps">
      <template #header>
        <ep-header :styles="{
          '--ep-header-container-height': '9.1rem',
          '--ep-header-container-border-width': '0'
        }">
          <template #left>
            <h1 class="page-head">
              Assets
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
        <h1>{{ assetDataRef.length }} assets</h1>
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
    <in-sidebar-layout sidebar-padding="2rem 0 0 3rem">
      <template #sidebar>
        <div class="sidebar">
          <ep-flex-container
            flex-flow="column nowrap"
            gap="1.5rem"
            padding="1rem 0"
          >
            <ep-dropdown v-bind="columnFiltersDropdownProps">
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
        </div>
      </template>
      <template #content>
        <ep-empty-state
          v-if="visibleData.length === 0"
          style="height: 100%;"
        >
          <p>No assets found</p>
          <template #subtext>
            <p>Try adjusting your filters</p>
          </template>
        </ep-empty-state>
        <!-- <ep-container
          v-else
          v-bind="tableContainerProps"
        > -->
        <ep-table
          v-else
          ref="tableComponent"
          :columns="visibleColumns"
          :data="visibleData"
          v-bind="tableProps"
          @row-click="handleRowClick"
        >
          <template #header="{ column, headerStyles, columnIndex }">
            <ep-table-sortable-header
              :column="column"
              :sort-column="sortColumn"
              :sort-order="sortOrder"
              :header-styles="headerStyles"
              :column-index="columnIndex"
              @sort="sortBy"
            />
          </template>
        </ep-table>
        <!-- </ep-container> -->
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
  import { assetColumns } from './assetData.js'
  import {
    useExclude,
    useColumnFilters,
    useDataFilters,
    useSorting,
    // usePagination,
    // useSearch
  } from '@epicenter/composables/index.js'


  const search = ref([])

  const store = useStore()
  const router = useRouter()
  const { commonPageHeaderProps } = store.state.commonProps
  const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
  const leftPanelCollapsedUser = computed(() => store.state.leftPanelCollapsedUser)
  const rightPanelOpen = computed(() => store.state.rightPanelOpen)

  const containerProps = {
    styles: {
      '--ep-container-bg-color': 'var(--interface-overlay)',
      '--ep-container-border-radius': 'var(--border-radius)',
      '--ep-container-border-color': 'var(--border-color--lighter)',
      '--ep-container-padding': '2rem',
    }
  }

  // const tableContainerProps = {
  //   styles: {
  //     ...commonContainerProps.styles,
  //     '--ep-container-padding': '2rem 3rem 30rem 3rem',
  //     '--ep-container-width': 'fit-content',
  //     '--ep-container-border-width': '0',
  //     '--ep-container-border-radius': '0',
  //   }
  // }

  const fixedHeader = ref(false)
  // const tHeadLeft = ref(0)

  const tableProps = computed(() => {
    return {
      bordered: true,
      headerBackgroundColor: 'var(--interface-surface)',
      selectable: true,
      // stickyHeader: true,
      fixedHeader: fixedHeader.value,
      // tHeadLeft: tHeadLeft.value,
      striped: true,
      styles: {
        // '--ep-table-width': 'max-content',
        // '--ep-table-sticky-top': '61px',
        // '--ep-table-container-overflow': 'unset'
        '--ep-table-width': 'max-content',
        '--ep-table-head-width': 'max-content',
        '--ep-table-body-width': 'max-content',
        '--ep-table-container-overflow': 'auto',
        '--ep-table-container-padding': '1rem 3rem 30rem 3rem',
        '--ep-table-fixed-top': '102px',
      },
    }
  })

  // const onSideBarLayoutScroll = (scroll) => {
  //   console.log('scrollLeft', scroll.left)
  //   // tHeadLeft.value = scroll.left
  // }

  const debounce = (func, delay) => {
    let timer
    return function(...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  const tableComponent = ref(null)

  const handleScroll = (scrollTop) => {
    // requestAnimationFrame(() => {
    const table = tableComponent.value.$refs.tableContainer
    const sidebarLayoutContent = document.querySelector('.content')

    if (!fixedHeader.value && scrollTop > 522) {
      fixedHeader.value = true
      table.style.paddingTop = '54.5px'
      sidebarLayoutContent.scrollTop += 44.5
    }
    if (fixedHeader.value && scrollTop < 522) {
      fixedHeader.value = false
      table.style.paddingTop = '10px'
      sidebarLayoutContent.scrollTop -= 10
    }
    // })
  }

  const debouncedHandleScroll = debounce(handleScroll, 10)

  // inject scroll position of .content from InGrid.vue
  const contentScrollTop = inject('contentScrollTop')

  watch(() => contentScrollTop.value, () => {
    console.log('scrollTop', contentScrollTop.value)
    handleScroll(contentScrollTop.value)
    // debouncedHandleScroll(contentScrollTop.value)
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
  } = useExclude(assetColumnsRef, assetDataRef, ['id'])

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
    filteredData
  } = useDataFilters(includedColumns, sortedData)

  const hiddenColumns = [
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
  } = useColumnFilters(includedColumns, hiddenColumns, filteredData)

  const columnFiltersDropdownProps = {
    buttonProps: {
      label: 'Columns',
      variant: 'secondary',
      iconLeft: { name: 'f-columns' },
    }
  }

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
      '--ep-container-border-width': '0',
      '--ep-container-padding': '0 4rem',
    }
  }

  const chartContainerProps = {
    styles: {
      '--ep-container-bg-color': 'transparent',
      '--ep-container-border-width': '0',
      '--ep-container-content-padding': '3rem 0',
    }
  }

  const handleRowClick = (row) => {
    store.commit('addSelectedAsset', row)
    router.push({ path: `/assets/${row.id}` })
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
</script>

<style lang="scss" scoped>
  .assets {
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
