<template>
  <div class="users">
    <ep-header
      leftFlex="0 0 10rem"
      centerFlex="1"
      centerJustify="flex-start"
      rightFlex="0 0 10rem"
      padding="0 3rem"
      sticky
      stickyTop="6.1rem"
      z-index="var(--z-index--fixed)"
    >
      <template #left>
        <p class="text--subtle">{{ filteredData.length }} Users</p>
      </template>
      <template #center>
        <ep-checkbox
          label="Show Deactivated"
          v-model="showInactive"
        />
      </template>
      <template #right>
        <ep-button
          variant="primary"
          label="New User"
          @click="addUser"
        />
      </template>
    </ep-header>
    <ep-table
      v-show="!loading"
      :columns="columns"
      :data="filteredData"
      sticky-header
      sticky-top="12.2rem"
      striped
      bordered
      sortable
      width="100%"
      padding="0 1.6rem 10rem 1.6rem"
    />
    <modal v-if="showModal">
      <add-user @close="showModal = false" />
    </modal>
  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import AddUser from './AddUser.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'Users',
    components: {
      AddUser,
      Modal,
    },
    data() {
      return {
        columns: [
          {
            header: 'Status',
            key: 'status',
            formatter: (value, row) => {
              return `<div class="status-dot status-dot--${value.toLowerCase()}">${value}</div>`
            }
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
        // approvedDomainOptions: [
        //   { label: 'acme.io', value: 'acme.io' },
        //   { label: 'test.acme.io', value: 'test.acme.io' },
        // ],
        loading: true,
        showInactive: false,
        showModal: false,
      }
    },
    computed: {
      ...mapState(['approvedDomains', 'fakeUserData']),
      filteredData() {
        return this.fakeUserData.filter(user => {
          if (this.showInactive) return true
          return user.status === 'Active'
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