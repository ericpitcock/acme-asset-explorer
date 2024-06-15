<template>
  <ep-flex flex-props=",,column,,,flex-start,,2rem,1rem 3rem 0rem 3rem">
    <ep-table
      :columns="columns"
      :data="sortedData"
      v-bind="tableProps"
    >
      <template #header="{ column }">
        <ep-table-sortable-header
          :column="column"
          :sort-column="sortColumn"
          :sort-order="sortOrder"
          @sort="sortBy"
        />
      </template>
    </ep-table>
    <ep-button
      label="New API Config"
      :icon-left="{ name: 'f-plus' }"
      @click="addApiConfig"
    />
  </ep-flex>
</template>

<script setup>
  import { ref } from 'vue'
  import { formatDate, generateFutureDate, generateRecentDate, generatePastDate } from '../../../utils/helpers'
  import {
    useSorting,
  } from '@epicenter/composables/index.js'

  defineOptions({
    name: 'ApiAccessConfiguration',
  })

  const tableProps = {
    bordered: true,
    hiddenColumns: ['api_key'],
    selectable: true,
    sortable: true,
    stickyHeader: true,
    striped: true,
    styles: {
      '--ep-table-container-width': '100%',
      '--ep-table-container-overflow': 'unset',
      '--ep-table-width': '100%',
      '--ep-table-sticky-top': '61px',
    }
  }

  const columns = ref([
    {
      label: 'Status',
      key: 'status',
      component: 'ep-badge',
      sortable: true,
    },
    {
      label: 'Nickname',
      key: 'nickname',
      sortable: true,
    },
    {
      label: 'Endpoint',
      key: 'endpoint',
      sortable: true,
    },
    {
      label: 'Auth Type',
      key: 'auth_type',
      sortable: true,
    },
    {
      label: 'API Key',
      key: 'api_key',
      sortable: true,
    },
    {
      label: 'Created',
      key: 'created',
      formatter: (value) => formatDate(value),
      sortable: true,
    },
    {
      label: 'Expires',
      key: 'expires',
      formatter: (value) => formatDate(value),
      sortable: true,
    },
  ])

  const data = ref([
    {
      status: {
        value: 'Active',
        props: {
          label: 'Active',
          styles: {
            '--ep-badge-bg-color': 'transparent',
            '--ep-badge-border-color': `var(--color-status--success-border)`,
          }
        },
      },
      nickname: 'Tickets',
      endpoint: 'Ticketing API',
      auth_type: 'OAuth',
      api_key: 'AbCdEfGhIjKlMnOpQrStUvWxYz123456',
      created: generatePastDate(),
      expires: generateFutureDate(),
    },
    {
      status: {
        value: 'Active',
        props: {
          label: 'Active',
          styles: {
            '--ep-badge-bg-color': 'transparent',
            '--ep-badge-border-color': `var(--color-status--success-border)`,
          }
        },
      },
      nickname: 'Threat Intel New',
      endpoint: 'Threat Intelligence API',
      auth_type: 'Token',
      api_key: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
      created: generatePastDate(),
      expires: generateFutureDate(),
    },
    {
      status: {
        value: 'Expired',
        props: {
          label: 'Expired',
          styles: {
            '--ep-badge-bg-color': 'transparent',
            '--ep-badge-border-color': `var(--color-status--danger-border)`,
          }
        },
      },
      nickname: 'Threat Intel',
      endpoint: 'Threat Intelligence API',
      auth_type: 'Token',
      api_key: 'qwertyuiopasdfghjklzxcvbnm123456',
      created: generatePastDate(),
      expires: generateRecentDate({ days: 10 }),
    },
  ])

  const {
    sortedData,
    sortBy,
    sortColumn,
    sortOrder
  } = useSorting(data, 'status', 'asc')

  const addApiConfig = () => {
    console.log('Add API Config')
  }
</script>

<style lang="scss" scoped></style>
