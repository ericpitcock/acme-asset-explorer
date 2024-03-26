<template>
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
          :border-color="userRoleBorderColor"
          select-id="userRole"
          v-model="userRole"
        />
        <ep-input
          label="Name"
          size="large"
          :border-color="userNameBorderColor"
          v-model="userName"
        />
        <p class="font-size--small text--subtle">
          Approved domains: {{ approvedDomains.join(', ') }}
        </p>
        <ep-input
          label="Email"
          size="large"
          :border-color="userEmailBorderColor"
          v-model="userEmail"
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
          :border-color="userMobilePhoneBorderColor"
          v-model="userMobilePhone"
        />
        <ep-input
          label="Office Phone (Optional)"
          size="large"
          v-model="userOfficePhone"
        />
      </ep-flex-container>
      <roles-table :selected-role="userRole" />
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
</template>

<script>
  import RolesTable from './RolesTable.vue'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'AddUser',
    components: {
      RolesTable,
    },
    emits: ['close'],
    data() {
      return {
        roleOptions: [
          { label: 'User', value: 'User' },
          { label: 'Partner', value: 'Partner' },
          { label: 'Admin', value: 'Admin' },
        ],
        userRole: '',
        userName: '',
        userEmail: '',
        secondaryEmail: '',
        userMobilePhone: '',
        userOfficePhone: '',
        userRoleBorderColor: null,
        userNameBorderColor: null,
        userEmailBorderColor: null,
        userMobilePhoneBorderColor: null,
      }
    },
    computed: {
      ...mapState(['approvedDomains']),
    },
    methods: {
      ...mapMutations(['addUserData']),
      addUser() {
        if (!this.userRole || !this.userName || !this.userEmail || !this.userMobilePhone) {
          // Set border color to red for empty fields
          if (!this.userRole) this.userRoleBorderColor = 'red'
          if (!this.userName) this.userNameBorderColor = 'red'
          if (!this.userEmail) this.userEmailBorderColor = 'red'
          if (!this.userMobilePhone) this.userMobilePhoneBorderColor = 'red'
          return
        }

        this.addUserData({
          status: 'Active',
          name: this.userName,
          email: this.userEmail,
          role: this.userRole,
          last_active: new Date().toISOString(),
        })
        this.$emit('close')
      },
      dismissModal() {
        this.$emit('close')
        this.userRole = ''
        this.userName = ''
        this.userEmail = ''
        this.userSecondaryEmail = ''
        this.userMobilePhone = ''
        this.userOfficePhone = ''
      }
    },
    watch: {
      userRole() {
        this.userRoleBorderColor = null
      },
      userName() {
        this.userNameBorderColor = null
      },
      userEmail() {
        this.userEmailBorderColor = null
      },
      userMobilePhone() {
        this.userMobilePhoneBorderColor = null
      },
    }
  }
</script>

<style lang="scss" scoped></style>