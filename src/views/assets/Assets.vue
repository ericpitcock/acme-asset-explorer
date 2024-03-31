<template>
  <div class="assets">
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
    <ep-flex-container
      flex-flow="row nowrap"
      gap="1rem"
      padding="0 1.6rem"
    >
      <div class="sidebar">
        <ep-container
          :backgroundColor="containerProps.backgroundColor"
          :borderColor="containerProps.borderColor"
          :borderRadius="containerProps.borderRadius"
          :containerPadding="containerProps.containerPadding"
        >
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
      <ep-table
        v-bind="tableProps"
        :search="search"
        :hiddenColumns="hiddenColumns"
        @data-changed="handleDataChanged"
        style="width: 100%"
      />
    </ep-flex-container>
  </div>
</template>

<script>
  import { assetColumns, assetData } from './assetData'

  export default {
    name: 'Assets',
    components: {
    },
    data() {
      return {
        assetColumns,
        assetCount: assetData.length,
        containerProps: {
          backgroundColor: 'var(--interface-overlay)',
          borderColor: 'var(--border-color--lighter)',
          borderRadius: 'var(--border-radius)',
          containerPadding: '2rem',
        },
        headerProps: {
          backgroundColor: 'var(--interface-surface)',
          leftFlex: '0 0 10rem',
          centerFlex: '1',
          rightFlex: '0 0 10rem',
          sticky: true,
          stickyTop: '0',
          padding: '0 3rem',
          zIndex: 'var(--z-index--fixed)',
        },
        hiddenColumns: ['ipv6_address', 'mac_address'],
        multiSearchProps: {
          height: '4rem',
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
          stickyTop: '0',
          sortable: true,
          sortDir: 'asc',
          striped: true,
          bordered: true,
          searchable: true,
          calculateHeight: true,
          width: '100%',
          padding: '0 1.6rem 10rem 1.6rem',
        }
      }
    },
    computed: {
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
    background-color: var(--interface-surface);
  }
</style>