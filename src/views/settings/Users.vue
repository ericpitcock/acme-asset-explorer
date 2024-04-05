<template>
  <div class="users">
    <sidebar-layout sidebar-padding="2rem 0 0 3rem">
      <template #sidebar>
        <ep-flex-container
          flex-flow="column nowrap"
          align-items="flex-start"
          gap="3rem"
          padding="1rem 0"
        >
          <ep-button
            variant="primary"
            label="New User"
            @click="addUser"
          />

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
                {{ category }}
              </h3>
              <ep-checkbox
                v-for="checkbox in filterSet"
                :key="checkbox.label"
                v-bind="checkbox"
                v-model="checkbox.checked"
              />
            </template>
          </ep-flex-container>
        </ep-flex-container>
      </template>
      <template #content>
        <ep-container
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
        >
          <ep-table
            v-show="!loading"
            :columns="columns"
            :data="filteredData"
            sticky-header
            sticky-top="61"
            striped
            bordered
            sortable
            width="100%"
            style="width: 100%; overflow: unset;"
          />
        </ep-container>
      </template>
    </sidebar-layout>
    <modal v-if="showModal">
      <add-user @close="showModal = false" />
    </modal>
  </div>
</template>

<script>
  import AddUser from './AddUser.vue'
  import Modal from '@/components/Modal.vue'
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import { mapState } from 'vuex'
  import { faker } from '@faker-js/faker'

  export default {
    name: 'Users',
    components: {
      AddUser,
      Modal,
      SidebarLayout,
    },
    data() {
      return {
        columns: [
          {
            header: 'Status',
            key: 'status',
            cellType: 'component',
            component: 'ep-badge',
          },
          { header: 'Name', key: 'name' },
          { header: 'Email', key: 'email' },
          { header: 'Role', key: 'role' },
          {
            header: 'Last Active',
            key: 'last_active',
            formatter: (value) => new Date(value).toLocaleString()
          },
        ],
        filters: {},
        loading: true,
        showInactive: false,
        showModal: false,
      }
    },
    computed: {
      ...mapState([
        'approvedDomains',
        'commonContainerProps',
        'fakeUserData',
      ]),
      filteredData() {
        let filtered = this.fakeUserData

        // Apply filters
        for (const key in this.filters) {
          filtered = filtered.filter(user => {
            const value = this.getColumnValue(user, key)
            const checked = this.filters[key].find(filter => filter.value === value).checked
            return checked
          })
        }

        return filtered
      },
    },
    methods: {
      addUser() {
        return (this.approvedDomains.length)
          ? this.showModal = true
          : this.$epDialog.open({
            title: 'No Approved Domains',
            message: 'You need to add an approved domain to your company profile before you can add a new user.',
            buttons: [
              {
                variant: 'secondary',
                text: 'Cancel',
              },
              {
                variant: 'primary',
                text: 'Add Domain',
                action: () => this.$router.push('/settings/company-profile')
              },
            ]
          })
      },
      generateFilters(columnsToFilter, disabledFilters) {
        const uniqueValues = {}
        // Extract unique values for specified columns
        this.columns.forEach(column => {
          if (columnsToFilter.includes(column.key)) {
            uniqueValues[column.key] = Array.from(new Set(this.fakeUserData.map(user => this.getColumnValue(user, column.key))))
          }
        })
        //alphabetize unique values
        for (const key in uniqueValues) {
          uniqueValues[key].sort()
        }

        const filters = {}

        // Generate filter objects based on unique values
        for (const key in uniqueValues) {
          filters[key] = uniqueValues[key].map(value => ({
            id: faker.string.uuid(),
            name: key,
            value: value,
            checked: true,
            label: value,
            disabled: false
          }))
        }

        // uncheck disabledFilters by default
        for (const key in filters) {
          filters[key].forEach(filter => {
            if (disabledFilters.includes(filter.value)) {
              filter.checked = false
            }
          })
        }

        this.filters = filters
      },
      getColumnValue(user, key) {
        const column = this.columns.find(column => column.key === key)
        if (column.cellType === 'component') {
          return user[key].value
        } else {
          return user[key]
        }
      },
    },
    mounted() {
      const columnsToFilter = ['status', 'role']
      const disabledFilters = ['Deactivated']

      this.generateFilters(columnsToFilter, disabledFilters)

      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
</script>

<style lang="scss" scoped>
  .users {
    .text-style--section:not(:first-child) {
      margin-top: 1rem;
    }

    :deep(.ep-table-container) {
      // overflow: revert;
      overflow-x: auto;
    }
  }
</style>