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
          @click="showModal = true"
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
      <ep-container
        width="90rem"
        container-padding="0 3rem 1rem 3rem"
        content-padding="3rem 0"
      >
        <template #header>
          <ep-header>
            <template #left>
              <h1>New User</h1>
            </template>
            <template #right>
              <p class="text--subtle">All fields required unless noted</p>
            </template>
          </ep-header>
        </template>
        <ep-flex-container
          flex-flow="row nowrap"
          gap="3rem"
        >
          <ep-flex-container
            flex-flow="column nowrap"
            gap="1rem"
          >
            <ep-select
              placeholder="Choose a role…"
              size="large"
              :options="roleOptions"
              select-id="userRole"
              v-model="userRole"
            />
            <ep-input
              label="Name"
              size="large"
              v-model="userName"
            />
            <p class="font-size--small text--subtle">
              Approved domains: acme.io, test.acme.io
            </p>
            <ep-input
              label="Email"
              size="large"
              v-model="userEmailmail"
            />
            <ep-input
              label="Secondary Email (Optional)"
              size="large"
              v-model="secondaryEmail"
            />
            <p class="font-size--small text--subtle">
              Mobile phone is used for authentication purposes.
            </p>
            <ep-input
              label="Mobile Phone"
              size="large"
              v-model="userMobilePhone"
            />
            <ep-input
              label="Office Phone (Optional)"
              size="large"
              v-model="userOfficePhone"
            />
          </ep-flex-container>
          <roles />
        </ep-flex-container>
        <template #footer>
          <ep-footer right-gap="1rem">
            <template #right>
              <ep-button
                variant="secondary"
                label="Cancel"
                @click="dismissModal"
              />
              <ep-button
                variant="primary"
                label="Add User"
                @click="addUser"
              />
            </template>
          </ep-footer>
        </template>
      </ep-container>
    </modal>
  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import Roles from './Roles.vue'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'Users',
    components: {
      Modal,
      Roles,
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
        approvedDomainOptions: [
          { label: 'acme.io', value: 'acme.io' },
          { label: 'test.acme.io', value: 'test.acme.io' },
        ],
        loading: true,
        roleOptions: [
          { label: 'User', value: 'User' },
          { label: 'Partner', value: 'Partner' },
          { label: 'Admin', value: 'Admin' },
        ],
        showInactive: false,
        showModal: false,
        userRole: '',
        userName: '',
        userEmail: '',
        // userEmailDomain: 'acme.io',
        userSecondaryEmail: '',
        // userSecondaryEmailDomain: '',
        userMobilePhone: '',
        userOfficePhone: '',
      }
    },
    computed: {
      ...mapState(['fakeUserData']),
      filteredData() {
        return this.fakeUserData.filter(user => {
          if (this.showInactive) return true
          return user.status === 'Active'
        })
      }
    },
    methods: {
      ...mapMutations(['addUserData']),
      addUser() {
        this.addUserData({
          status: 'Active',
          name: this.userName,
          email: this.userEmail,
          role: this.userRole,
          last_active: new Date().toISOString(),
        })
        this.dismissModal()
      },
      dismissModal() {
        this.showModal = false
        this.userRole = ''
        this.userName = ''
        this.userEmail = ''
        // this.userEmailDomain = 'acme.io'
        this.userSecondaryEmail = ''
        // this.userSecondaryEmailDomain = ''
        this.userMobilePhone = ''
        this.userOfficePhone = ''
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