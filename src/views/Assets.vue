<template>
  <div class="assets">
    <ep-header
      leftFlex="0 0 10rem"
      centerFlex="1"
      rightFlex="0 0 10rem"
      sticky
      stickyTop="0"
      padding="0 3rem"
      z-index="var(--z-index--fixed)"
    >
      <template #left>
        <p class="text--subtle">{{ assetCount }} assets</p>
      </template>
      <template #center>
        <ep-multi-search
          height="4rem"
          backgroundColor="var(--interface-foreground)"
          :icon="{ name: 'search' }"
          placeholder='Multi Search - Enter to search - Use quotes for exact match, e.g. "active"'
          @enter="updateSearch"
          @delete="updateSearch"
          @query-close="queryClose"
          @clear="updateSearch"
        />
      </template>
      <template #right>
        <ep-button
          variant="ghost"
          :iconLeft="{ name: 'file' }"
          @click=""
        />
      </template>
    </ep-header>
    <ep-table
      :columns="columns"
      :data="data"
      :exclude="['id']"
      :search="search"
      sticky-header
      sticky-top="0"
      sortable
      sortDir="asc"
      striped
      bordered
      searchable
      calculate-height
      padding="0 1.6rem 10rem 1.6rem"
      @data-changed="handleDataChanged"
    />
  </div>
</template>

<script>
  import { columns, merged } from './assetData'

  export default {
    name: 'Assets',
    components: {
    },
    data() {
      return {
        assetCount: merged.length,
        columns,
        data: merged,
        search: [],
      }
    },
    methods: {
      handleDataChanged(data) {
        this.assetCount = data.length
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

<style lang="scss" scoped></style>