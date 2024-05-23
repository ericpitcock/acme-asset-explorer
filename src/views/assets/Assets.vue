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
        <h1>{{ filteredData.length }} assets</h1>
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
                      @update:model-value="handleFilter"
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
                @update:model-value="console.log('update')"
              />
            </template>
          </ep-flex-container>
        </div>
      </template>
      <template #content>
        <ep-empty-state
          v-if="filteredData.length === 0"
          style="height: 100%;"
        >
          <p>No assets found</p>
          <template #subtext>
            <p>Try adjusting your filters</p>
          </template>
        </ep-empty-state>
        <ep-container
          v-else
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
        >
          <ep-table
            :data="filteredData"
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
  import { ref, computed, onMounted, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import EpEmptyState from '@ericpitcock/epicenter-vue-components/src/components/empty-state/EpEmptyState.vue'
  import InSeverityChart from './InSeverityChart.vue'
  import InVulnTrendChart from './InVulnTrendChart.vue'
  import InOsVersionChart from './InOsVersionChart.vue'
  import useFilters from '@/composables/useFilters.js'
  import useExclude from '@epicenter/components/table/useExclude.js'
  import { assetColumns } from './assetData.js'

  const hiddenColumns = ref([
    'ipv6_address',
    'mac_address',
    'last_seen',
    'os_version',
    'operating_system',
    'endpoint_version',
  ])
  const search = ref([])

  const store = useStore()
  const router = useRouter()
  const { commonContainerProps, commonPageHeaderProps } = store.state.commonProps
  const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
  const leftPanelCollapsedUser = computed(() => store.state.leftPanelCollapsedUser)
  const rightPanelOpen = computed(() => store.state.rightPanelOpen)

  const assetDataRef = computed(() => store.state.assets)

  const containerProps = {
    styles: {
      '--ep-container-bg-color': 'var(--interface-overlay)',
      '--ep-container-border-radius': 'var(--border-radius)',
      '--ep-container-border-color': 'var(--border-color--lighter)',
      '--ep-container-padding': '2rem',
    }
  }

  const multiSearchProps = {
    height: '3.8rem',
    backgroundColor: 'var(--interface-foreground)',
    icon: { name: 'search' },
    placeholder: 'Search assets',
  }

  const tableProps = {
    columns: assetColumns,
    bordered: true,
    exclude: ['id', 'status'],
    headerBackgroundColor: 'var(--interface-surface)',
    searchable: true,
    selectable: true,
    stickyHeader: true,
    stickyTop: '61',
    striped: true,
    sortDir: 'desc',
    sortable: true,
    width: '100%',
  }

  const columnFilters = computed(() => {
    return assetColumns.map(column => ({
      id: column.key,
      name: 'columns',
      value: column.key,
      checked: !hiddenColumns.value.includes(column.key),
      label: column.label,
      disabled: false,
    })).filter(filter => !tableProps.exclude.includes(filter.id))
  })

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

  const handleFilter = (event) => {
    if (!event.target.checked) {
      hiddenColumns.value.push(event.target.id)
    } else {
      hiddenColumns.value = hiddenColumns.value.filter(column => column !== event.target.id)
    }
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

  onMounted(() => {
    const columnsToFilter = ['status', 'endpoint_version', 'location', 'operating_system']
    const disabledFilters = ['Archived']

    generateFilters(columnsToFilter, disabledFilters)
  })

  const { filters, generateFilters, filteredData } = useFilters(assetColumns, assetDataRef)

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
  }
</style>
