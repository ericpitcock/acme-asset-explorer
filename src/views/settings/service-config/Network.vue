<template>
  <div class="network">
    <ep-table
      :columns="columns"
      :data="sortedData"
      striped
      bordered
      selectable
      sticky-header
      :styles="{
        '--ep-table-container-padding': '1rem 3rem 30rem 3rem',
        '--ep-table-container-overflow': 'unset',
        '--ep-table-width': '100%',
        '--ep-table-sticky-top': '61px',
      }"
      @row-click="handleRowClick"
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
    <in-modal
      v-if="showModal"
      modal-height="100%"
      padding="2rem"
    >
      <config-modal
        :config="selectedConfig"
        @close="showModal = false"
      />
    </in-modal>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import ConfigModal from './ConfigModal.vue'
  import InModal from '@/components/InModal.vue'
  import { formatDateTime, generateRecentDate } from '@/utils/helpers'
  import { faker } from '@faker-js/faker'
  import { useStore } from 'vuex'
  import {
    useDataFilters,
    useSorting,
  } from '@epicenter/composables/index.js'

  defineOptions({
    name: 'InNetwork',
  })

  const selectedConfig = ref(null)
  const showModal = ref(false)

  const store = useStore()
  const sites = store.state.sites

  const columns = ref([
    {
      label: 'Config Status',
      key: 'config_status',
      component: 'ep-badge',
      sortable: true,
    },
    {
      label: 'Name',
      key: 'name',
      sortable: true,
    },
    {
      label: 'Site',
      key: 'site',
      sortable: true,
    },
    {
      label: 'Type',
      key: 'type',
      sortable: true,
    },
    {
      label: 'Modified',
      key: 'modified',
      formatter: (value) => formatDateTime(value),
      sortable: true,
    }
  ])

  const data = computed(() => {
    const data = []
    const siteNames = sites.map(site => site.name)

    for (let i = 0; i < 8; i++) {
      const configStatus = faker.helpers.arrayElement(['Configured', 'Not Configured'])
      const variant = configStatus === 'Configured' ? 'success' : 'warning'

      data.push({
        config_status: {
          value: configStatus,
          props: {
            label: configStatus,
            styles: {
              '--ep-badge-bg-color': 'transparent',
              '--ep-badge-border-color': configStatus === 'Configured' ? 'var(--color-status--success-border)' : 'var(--color-status--warning-border)',
            }
          }
        },
        name: `cyclops-${faker.number.int({ min: 1000, max: 9999 })}`,
        site: faker.helpers.arrayElement(siteNames),
        type: faker.helpers.arrayElement(['Physical', 'VMWare', 'AWS']),
        modified: generateRecentDate()
      })
    }

    return data
  })

  const {
    sortedData,
    sortBy,
    sortColumn,
    sortOrder
  } = useSorting(data, 'config_status', 'asc')

  const handleRowClick = (row) => {
    selectedConfig.value = row
    showModal.value = true
  }
</script>

<style lang="scss" scoped>
  .network {
    width: 100%;
  }
</style>