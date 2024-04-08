<template>
  <div class="network">
    <ep-container
      v-bind="commonContainerProps"
      container-padding="1rem 3rem 3rem"
    >
      <ep-table
        :columns="columns"
        :data="data"
        bordered
        selectable
        width="100%"
        @row-click="showModal = true"
      />
    </ep-container>
    <modal v-if="showModal">
      network config
    </modal>
  </div>
</template>

<script>
  import { faker } from '@faker-js/faker'
  import { mapState } from 'vuex'
  import Modal from '@/components/Modal.vue'

  export default {
    name: 'Network',
    components: {
      Modal
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
  }
</script>

<style lang="scss" scoped>
  .network {
    width: 100%;
  }
</style>