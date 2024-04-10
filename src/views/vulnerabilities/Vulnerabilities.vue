<template>
  <div class="vulnerabilities">
    <ep-container v-bind="headerContainerProps">
      <template #header>
        <ep-header>
          <template #left>
            <h1 class="page-head">Vulnerabilities</h1>
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
        <h1>{{ filteredData.length }} Vulnerabilities</h1>
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
          container-padding="1rem 3rem 3rem"
        >
          <ep-table
            :columns="vulnTableColumns"
            :data="filteredData"
            v-bind="tableProps"
            :search="search"
            :hiddenColumns="hiddenColumns"
            style="width: 100%; overflow: unset;"
            @row-click="handleRowClick"
          />
        </ep-container>
      </template>
    </sidebar-layout>
  </div>
</template>

<script>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import vulnChartOptions from './vulnChartOptions.js'
  import { vulnTableColumns, vulnTableData } from '../../store/vulnData.js'
  import useFilters from '@/composables/useFilters.js'

  export default {
    name: 'Vulnerabilities',
    components: {
      SidebarLayout,
    },
    setup() {
      const store = useStore()
      const commonPageHeaderProps = store.state.commonProps.commonPageHeaderProps
      const commonContainerProps = computed(() => store.state.commonProps.commonContainerProps)
      const leftPanelCollapsed = computed(() => store.state.leftPanelCollapsed)
      const rightPanelOpen = computed(() => store.state.rightPanelOpen)

      const router = useRouter()
      const route = useRoute()
      const search = ref(route.query.id ? [route.query.id] : []) // Use route.query.id instead of router.currentRoute.value.query.id

      const hiddenColumns = ref(['published_date', 'last_modified_date', 'date_seen'])
      const vulnTableDataRef = ref(vulnTableData)

      const multiSearchProps = {
        height: '3.8rem',
        backgroundColor: 'var(--interface-foreground)',
        icon: { name: 'search' },
        placeholder: 'CVE ID Search',
      }

      const tableProps = {
        bordered: true,
        selectable: true,
        stickyHeader: true,
        stickyTop: '61',
        sortable: true,
        searchable: true,
        width: '100%',
        exclude: [],
      }

      const contentHeaderProps = computed(() => ({
        ...commonPageHeaderProps,
        leftFlex: '0 0 20rem',
        centerFlex: '1',
        rightFlex: '0 0 20rem',
        rightPadding: '0 3rem',
        itemGap: '0',
      }))

      const headerContainerProps = computed(() => ({
        borderWidth: '0',
        containerPadding: '0 3rem',
        contentPadding: '2rem 3rem 0 3rem',
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

      watch(() => leftPanelCollapsed.value, () => {
        window.dispatchEvent(new Event('resize'))
      })

      watch(() => rightPanelOpen.value, () => {
        window.dispatchEvent(new Event('resize'))
      })

      onMounted(() => {
        const columnsToFilter = ['severity']
        const disabledFilters = []
        const customSortOrder = {
          'severity': ['Critical', 'High', 'Medium', 'Low']
        }

        generateFilters(columnsToFilter, disabledFilters, customSortOrder)
      })

      const { filters, generateFilters, filteredData } = useFilters(vulnTableColumns, vulnTableDataRef)

      return {
        chartContainerProps,
        commonContainerProps,
        contentHeaderProps,
        filteredData,
        filters,
        generateFilters,
        handleRowClick,
        headerContainerProps,
        hiddenColumns,
        multiSearchProps,
        queryClose,
        search,
        tableProps,
        updateSearch,
        vulnChartOptions,
        vulnTableColumns,
        vulnTableData,
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
  }</style>
