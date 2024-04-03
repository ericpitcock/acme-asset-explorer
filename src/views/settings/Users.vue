<template>
  <div class="users">
    <sidebar-layout>
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
        filters: {
          status: [
            {
              id: faker.string.uuid(),
              name: 'status',
              value: 'active',
              checked: true,
              label: 'Active',
              disabled: false
            },
            {
              id: faker.string.uuid(),
              name: 'status',
              value: 'deactivated',
              checked: false,
              label: 'Deactivated',
              disabled: false
            },
          ],
          role: [
            {
              id: faker.string.uuid(),
              name: 'role',
              value: 'admin',
              checked: true,
              label: 'Admin',
              disabled: false
            },
            {
              id: faker.string.uuid(),
              name: 'role',
              value: 'user',
              checked: true,
              label: 'User',
              disabled: false
            },
            {
              id: faker.string.uuid(),
              name: 'role',
              value: 'partner',
              checked: true,
              label: 'Partner',
              disabled: false
            },
          ],
        },
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

        // filter out fonts in filters.status array that are not checked
        filtered = filtered.filter(user => {
          const status = user.status.value.toLowerCase()
          const checked = this.filters.status.find(filter => filter.value === status).checked
          return checked
        })

        // filter out fonts in filters.role array that are not checked
        filtered = filtered.filter(user => {
          const role = user.role.toLowerCase()
          const checked = this.filters.role.find(filter => filter.value === role).checked
          return checked
        })

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
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
</script>

<style lang="scss" scoped>
  .users {
    :deep(.ep-table-container) {
      // overflow: revert;
      overflow-x: auto;
    }
  }
</style>