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
        width="100%"
      />
    </ep-container>
  </div>
</template>

<script>
  import { faker } from '@faker-js/faker'
  import { mapState } from 'vuex'

  export default {
    name: 'Network',
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
          { header: 'Last Config Modified', key: 'last_config_modified' }
        ],
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
        'sites'
      ]),
      data() {
        const data = []
        const sites = this.sites.map(site => site.name)

        for (let i = 0; i < 3; i++) {
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
            last_config_modified: faker.date.recent()
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