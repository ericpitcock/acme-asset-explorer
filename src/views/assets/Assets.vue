<template>
  <div class="assets">
    <ep-container v-bind="headerContainerProps">
      <template #header>
        <ep-header
          height="9.1rem"
          border-width="0"
        >
          <template #left>
            <h1 class="page-head">Assets</h1>
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
                      @checkchange="handleFilter"
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
        <ep-container
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
          max-width="fit-content"
        >
          <ep-empty-state
            v-if="filteredData.length === 0"
            message="No Assets Found"
            subtext="Try adjusting your filters"
            style="margin-bottom: 1.5rem;"
          />
          <ep-table
            v-else
            :data="filteredData"
            v-bind="tableProps"
            :search="search"
            :hiddenColumns="hiddenColumns"
            style="width: 100%; overflow: unset;"
            @row-click="handleRowClick"
          />
        </ep-container>
      </template>
    </in-sidebar-layout>
  </div>
</template>

<script>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useStore } from 'vuex'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import { assetColumns, assetData } from './assetData.js'
  import useFilters from '@/composables/useFilters.js'
  import EpEmptyState from '@ericpitcock/epicenter-vue-components/src/components/empty-state/EpEmptyState.vue'
  import InSeverityChart from './InSeverityChart.vue'
  import InVulnTrendChart from './InVulnTrendChart.vue'
  import InOsVersionChart from './InOsVersionChart.vue'

  export default {
    name: 'Assets',
    components: {
      InSidebarLayout,
      EpEmptyState,
      InSeverityChart,
      InVulnTrendChart,
      InOsVersionChart,
    },
    setup() {
      const hiddenColumns = ref(['ipv6_address', 'mac_address'])
      const search = ref([])

      const store = useStore()
      const { commonContainerProps, commonPageHeaderProps } = store.state.commonProps
      const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
      const rightPanelOpen = computed(() => store.state.rightPanelOpen)

      const assetDataRef = ref(assetData)

      const containerProps = {
        backgroundColor: 'var(--interface-overlay)',
        borderRadius: 'var(--border-radius)',
        borderColor: 'var(--border-color--lighter)',
        containerPadding: '2rem',
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
        exclude: ['id'],
        headerBackgroundColor: 'var(--interface-surface)',
        searchable: true,
        selectable: true,
        stickyHeader: true,
        stickyTop: '61',
        striped: true,
        sortDir: 'asc',
        sortable: true,
        width: '100%',
      }

      const columnFilters = computed(() => {
        return assetColumns.map(column => ({
          id: column.key,
          name: 'columns',
          value: column.key,
          checked: !hiddenColumns.value.includes(column.key),
          label: column.header,
          disabled: false,
        })).filter(filter => !tableProps.exclude.includes(filter.id))
      })

      const columnFiltersDropdownProps = {
        buttonProps: {
          label: 'Columns',
          variant: 'secondary',
          iconLeft: { name: 'f/columns' },
        },
      }

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
        // contentPadding: '2rem 1rem 0 1rem',
      }))

      const chartContainerProps = {
        background: 'transparent',
        borderWidth: 'none',
        contentPadding: '3rem 0',
      }

      const handleRowClick = (row) => {
        console.log('row', row)
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

      watch(() => leftPanelCollapsed.value, () => {
        window.dispatchEvent(new Event('resize'))
      })

      watch(() => rightPanelOpen.value, () => {
        window.dispatchEvent(new Event('resize'))
      })

      onMounted(() => {
        const columnsToFilter = ['status', 'endpoint_version', 'location', 'operating_system']
        const disabledFilters = ['Archived', 'Inactive']

        generateFilters(columnsToFilter, disabledFilters)
      })

      const { filters, generateFilters, filteredData } = useFilters(assetColumns, assetDataRef)

      return {
        assetColumns,
        assetData,
        chartContainerProps,
        columnFilters,
        columnFiltersDropdownProps,
        commonContainerProps,
        commonPageHeaderProps,
        containerProps,
        contentHeaderProps,
        multiSearchProps,
        search,
        tableProps,
        filters,
        filteredData,
        handleRowClick,
        handleFilter,
        headerContainerProps,
        hiddenColumns,
        queryClose,
        updateSearch,
      }
    }
  }
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
