<template>
  <div class="assets">
    <!-- <ep-chart :options="browserChartOptions" /> -->
    <ep-header v-bind="headerProps">
      <template #left>
        <h1>Assets</h1>
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
        <ep-dropdown
          :buttonProps="{
            variant: 'ghost',
            label: '',
            iconRight: { name: 'f/columns' }
          }"
          align-right
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
                  @checkchange="handleFilter"
                />
              </ep-flex-container>
            </ep-container>
          </template>
        </ep-dropdown>
      </template>
    </ep-header>
    <sidebar-layout sidebar-padding="2rem 0 0 3rem">
      <template #sidebar>
        <div class="sidebar">
          <p class="text--subtle">{{ assetCount }} assets</p>
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
        </div>
      </template>
      <template #content>
        <ep-container
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
        >
          <ep-empty-state
            v-if="filteredData.length === 0"
            message="No Assets Found"
            subtext="Try adjusting your filters"
            style="margin-bottom: 1.5rem;"
          />
          <ep-table
            v-else
            :columns="assetColumns"
            :data="filteredData"
            v-bind="tableProps"
            :search="search"
            :hiddenColumns="hiddenColumns"
            style="width: 100%; overflow: unset;"
            @data-changed="handleDataChanged"
            @row-click="handleRowClick"
          />
        </ep-container>
      </template>
    </sidebar-layout>
  </div>
</template>

<script>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import { assetColumns, assetData } from './assetData.js'
  import useFilters from '@/composables/useFilters.js'
  import EpEmptyState from '@ericpitcock/epicenter-vue-components/src/components/empty-state/EpEmptyState.vue'
  // import browserChartOptions from './browsers.js'

  export default {
    name: 'Assets',
    components: {
      SidebarLayout,
      EpEmptyState
    },
    setup() {
      const assetCount = ref(assetData.length)
      const hiddenColumns = ref(['ipv6_address', 'mac_address'])
      const search = ref([])

      const store = useStore()
      const commonContainerProps = computed(() => store.state.commonContainerProps)
      const commonPageHeaderProps = store.state.commonPageHeaderProps

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
        placeholder: 'Multi Search - Enter to search - Use quotes for exact match, e.g. "active"',
      }

      const tableProps = {
        // columns: assetColumns,
        // data: filteredData,
        exclude: ['id'],
        headerBackgroundColor: 'var(--interface-surface)',
        selectable: true,
        stickyHeader: true,
        stickyTop: '61',
        sortable: true,
        sortDir: 'asc',
        striped: true,
        bordered: true,
        searchable: true,
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

      const headerProps = computed(() => ({
        ...commonPageHeaderProps,
        leftFlex: '0 0 20rem',
        leftPadding: '0 3rem',
        centerFlex: '1',
        centerPadding: '0 3rem 0 0',
        rightFlex: '0 0 10rem',
        rightPadding: '0 3rem',
        itemGap: '0',
      }))

      const handleDataChanged = (data) => {
        assetCount.value = data.length
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

      onMounted(() => {
        const columnsToFilter = ['status', 'endpoint_version', 'location', 'operating_system']
        const disabledFilters = ['Archived', 'Inactive']

        generateFilters(columnsToFilter, disabledFilters)
      })

      const { filters, generateFilters, filteredData } = useFilters(assetColumns, assetDataRef)

      return {
        assetCount,
        assetColumns,
        assetData,
        columnFilters,
        commonContainerProps,
        commonPageHeaderProps,
        containerProps,
        multiSearchProps,
        search,
        tableProps,
        filters,
        filteredData,
        headerProps,
        handleDataChanged,
        handleRowClick,
        handleFilter,
        hiddenColumns,
        updateSearch,
        queryClose,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .assets {
    .text-style--section:not(:first-child) {
      margin-top: 1rem;
    }

    :deep(.ep-table-container) {
      // overflow: revert;
      overflow: unset;
    }
  }
</style>
