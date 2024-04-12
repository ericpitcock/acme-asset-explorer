<template>
  <div class="network">
    <ep-container
      v-bind="commonContainerProps"
      container-padding="1rem 3rem 3rem"
      max-width="120rem"
    >
      <ep-table
        :columns="columns"
        :data="data"
        bordered
        selectable
        width="100%"
        @row-click="handleRowClick"
      />
    </ep-container>
    <modal
      v-if="showModal"
      modal-height="100%"
      padding="2rem"
    >
      <config-modal
        :config="selectedConfig"
        @close="showModal = false"
      />
    </modal>
  </div>
</template>

<script>
  import { faker } from '@faker-js/faker'
  import { mapState } from 'vuex'
  import Modal from '@/components/Modal.vue'
  import ConfigModal from './ConfigModal.vue'

  export default {
    name: 'Network',
    components: {
      ConfigModal,
      Modal,
    },
    data() {
      return {
        columns: [
          {
            header: 'Config Status',
            key: 'config_status',
            cellType: 'component',
            component: 'ep-badge',
          },
          { header: 'Name', key: 'name' },
          { header: 'Site', key: 'site' },
          { header: 'Type', key: 'type' },
          {
            header: 'Modified',
            key: 'modified',
            formatter: (value) => new Date(value).toLocaleString()
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
                variant,
                outlined: true
              }
            },
            name: `cyclops-${faker.number.int({ min: 1000, max: 9999 })}`,
            site: faker.helpers.arrayElement(sites),
            type: faker.helpers.arrayElement(['Physical', 'VMWare', 'AWS']),
            modified: faker.date.recent().toISOString()
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