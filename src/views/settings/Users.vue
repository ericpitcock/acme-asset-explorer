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
            <h3 class="text-style--section">Status</h3>
            <ep-checkbox
              v-for="filter in filters"
              :key="filter.value"
              :label="filter.label"
              v-model="showInactive"
            />
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
            sticky-top="6.1rem"
            striped
            bordered
            sortable
            width="100%"
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
        filters: [
          { label: 'Active', value: 'Active' },
          { label: 'Deactivated', value: 'Deactivated' },
        ],
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
        return this.fakeUserData.filter(user => {
          if (this.showInactive) return true
          return user.status.value === 'Active'
        })
      }
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
  .users {}
</style>