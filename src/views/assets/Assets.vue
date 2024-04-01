<template>
  <div class="assets">
    <!-- <ep-chart :options="browserChartOptions" /> -->
    <ep-header v-bind="headerProps">
      <template #left>
        <p class="text--subtle">{{ assetCount }} assets</p>
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
    <sidebar-layout>
      <template #sidebar>
        <div class="sidebar">
          <ep-container>
            <ep-flex-container
              flex-flow="column nowrap"
              gap="1rem"
            >
              <ep-checkbox
                v-for="filter in filters"
                :key="filter.id"
                v-bind="filter"
                @checkchange="handleFilter"
              />
            </ep-flex-container>
          </ep-container>
        </div>
      </template>
      <template #content>
        <ep-container
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
        >
          <ep-table
            v-bind="tableProps"
            :search="search"
            :hiddenColumns="hiddenColumns"
            @data-changed="handleDataChanged"
            style="width: 100%  overflow: unset;"
          />
        </ep-container>
      </template>
    </sidebar-layout>
  </div>
</template>

<script>
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import { mapState } from 'vuex'
  import { assetColumns, assetData } from './assetData'
  import browserChartOptions from './browsers.js'

  export default {
    name: 'Assets',
    components: {
      SidebarLayout,
    },
    data() {
      return {
        assetColumns,
        assetCount: assetData.length,
        browserChartOptions,
        headerProps: {
          backgroundColor: 'var(--interface-surface)',
          leftFlex: '0 0 20rem',
          leftPadding: '0 3rem',
          centerFlex: '1',
          centerPadding: '0 3rem 0 0',
          sticky: true,
          stickyTop: '0',
          itemGap: '0',
          zIndex: 'var(--z-index--fixed)',
        },
        hiddenColumns: ['ipv6_address', 'mac_address'],
        multiSearchProps: {
          height: '3.8rem',
          backgroundColor: 'var(--interface-foreground)',
          icon: { name: 'search' },
          placeholder: 'Multi Search - Enter to search - Use quotes for exact match, e.g. "active"',
        },
        search: [],
        tableProps: {
          columns: assetColumns,
          data: assetData,
          exclude: ['id'],
          headerBackgroundColor: 'var(--interface-surface)',
          stickyHeader: true,
          stickyTop: '61',
          sortable: true,
          sortDir: 'asc',
          striped: true,
          bordered: true,
          searchable: true,
          // calculateHeight: true,
          width: '100%',
        }
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
      ]),
      filters() {
        const filters = this.assetColumns.map(column => {
          return {
            id: column.key,
            name: 'columns',
            value: column.key,
            checked: !this.hiddenColumns.includes(column.key),
            label: column.header,
            disabled: false,
          }
        })
        // remove everything from this.tablesProps.exclude
        return filters.filter(filter => !this.tableProps.exclude.includes(filter.id))
      }
    },
    methods: {
      handleDataChanged(data) {
        this.assetCount = data.length
      },
      handleFilter(event) {
        // if unchecked, add to hiddenColumns
        if (event.target.checked === false) {
          this.hiddenColumns.push(event.target.id)
        } else {
          // if checked, remove from hiddenColumns
          this.hiddenColumns = this.hiddenColumns.filter(column => column !== event.target.id)
        }
      },
      updateSearch(value) {
        this.search = value
      },
      queryClose(query) {
        this.search = this.search.filter(item => item !== query)
      },
      queryDelete(query) {
        this.search = query
      },
    }
  }
</script>

<style lang="scss" scoped>
  .assets {
    :deep(.ep-table-container) {
      // overflow: revert;
      overflow: unset;
    }
  }
</style>