<template>
  <div class="network">
    <ep-container
      v-bind="commonContainerProps"
      :styles="{
        '--ep-container-padding': '1rem 3rem 3rem',
        '--ep-container-max-width': '120rem',
        '--ep-container-border-width': '0',
      }"
    >
      <ep-table
        :columns="columns"
        :data="data"
        striped
        bordered
        selectable
        :styles="{
          '--ep-table-width': '100%',
        }"
        @row-click="handleRowClick"
      />
    </ep-container>
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

<script>
  import ConfigModal from './ConfigModal.vue'
  import InModal from '@/components/InModal.vue'
  import { generateRecentDate } from '../../../utils/helpers'
  import { faker } from '@faker-js/faker'
  import { mapState } from 'vuex'

  export default {
    name: 'InNetwork',
    components: {
      ConfigModal,
      InModal,
    },
    data() {
      return {
        columns: [
          {
            label: 'Config Status',
            key: 'config_status',
            component: 'ep-badge',
          },
          { label: 'Name', key: 'name' },
          { label: 'Site', key: 'site' },
          { label: 'Type', key: 'type' },
          {
            label: 'Modified',
            key: 'modified',
            formatter: (value) => new Date(value).toLocaleString(),
          }
        ],
        selectedConfig: null,
        showModal: false
      }
    },
    computed: {
      ...mapState('commonProps', {
        commonContainerProps: state => state.commonContainerProps,
      }),
      ...mapState([
        'sites'
      ]),
      data() {
        const data = []
        const sites = this.sites.map(site => site.name)

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
            site: faker.helpers.arrayElement(sites),
            type: faker.helpers.arrayElement(['Physical', 'VMWare', 'AWS']),
            modified: generateRecentDate()
          })
        }

        return data
      }
    },
    methods: {
      handleRowClick(row) {
        this.selectedConfig = row
        this.showModal = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .network {
    width: 100%;
  }
</style>