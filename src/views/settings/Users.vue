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
          label="Show Deactivated Users"
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
      calculate-height
      calculate-height-offset="12.2rem"
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
        width="60rem"
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
          flex-flow="column nowrap"
          gap="1rem"
        >
          <ep-select
            placeholder="Choose a role…"
            size="large"
            :options="roleOptions"
            v-model="userRole"
          />
          <ep-input
            label="Name"
            size="large"
            v-model="userName"
          />
          <ep-input
            label="Email"
            size="large"
            v-model="userEmail"
          />
          <ep-input
            label="Secondary Email (Optional)"
            size="large"
            v-model="userSecondaryEmail"
          />
          <ep-input
            label="Mobile Phone"
            size="large"
            v-model="userMobilePhone"
          />
          <p>Our Security Operations Center uses your mobile phone for
            authentication purposes.</p>
          <ep-input
            label="Office Phone (Optional)"
            size="large"
            v-model="userOfficePhone"
          />
        </ep-flex-container>
        <template #footer>
          <ep-footer right-gap="1rem">
            <template #right>
              <ep-button
                variant="secondary"
                label="Cancel"
                @click="showModal = false"
              />
              <ep-button
                variant="primary"
                label="Add User"
                @click="showModal = false"
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
  import { mapState } from 'vuex'

  export default {
    name: 'Users',
    components: {
      Modal
    },
    data() {
      return {
        columns: [
          { header: 'Status', key: 'status' },
          { header: 'Name', key: 'name' },
          { header: 'Email', key: 'email' },
          { header: 'Role', key: 'role' },
          {
            header: 'Last Active',
            key: 'last_active',
            formatter: (value) => new Date(value).toLocaleString()
          },
        ],
        loading: true,
        roleOptions: [
          { label: 'Admin', value: 'admin' },
          { label: 'Partner Admin', value: 'partner_admin' },
          { label: 'User', value: 'user' },
        ],
        showInactive: false,
        showModal: true,
        userRole: '',
        userName: '',
        userEmail: '',
        userSecondaryEmail: '',
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