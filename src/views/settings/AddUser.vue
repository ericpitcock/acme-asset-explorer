<template>
  <ep-container
    width="90rem"
    container-padding="0 3rem 1rem 3rem"
    content-padding="3rem 0"
  >
    <template #header>
      <ep-header>
        <template #left>
          <h1>{{ modalTitle }}</h1>
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
          {{ approvedDomainsMessage }}
        </p>
        <ep-input
          label="Email"
          size="large"
          :border-color="userEmailBorderColor"
          v-model="userEmail"
          :disabled="approvedDomains.length === 0"
        />
        <ep-input
          label="Secondary Email (Optional)"
          size="large"
          :border-color="secondaryEmailBorderColor"
          v-model="secondaryEmail"
          :disabled="approvedDomains.length === 0"
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
            :label="buttonLabel"
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
  import { faker } from '@faker-js/faker'

  export default {
    name: 'AddUser',
    components: {
      RolesTable,
    },
    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['close'],
    data() {
      return {
        roleOptions: [
          { label: 'User', value: 'User' },
          { label: 'Partner', value: 'Partner' },
          { label: 'Admin', value: 'Admin' },
        ],
        userId: '',
        userRole: '',
        userName: '',
        userEmail: '',
        secondaryEmail: '',
        userMobilePhone: '',
        userOfficePhone: '',
        userRoleBorderColor: null,
        userNameBorderColor: null,
        userEmailBorderColor: null,
        secondaryEmailBorderColor: null,
        userMobilePhoneBorderColor: null,
      }
    },
    computed: {
      ...mapState(['approvedDomains']),
      approvedDomainsMessage() {
        return this.approvedDomains.length
          ? `Approved domains: ${this.approvedDomains.join(', ')}`
          : 'You don’t have any approved domains. Add a domain to company profile to add a new user.'
      },
      buttonLabel() {
        return this.user ? 'Save Changes' : 'Add User'
      },
      modalTitle() {
        return this.user ? `Edit User: ${this.userId}` : 'Add User'
      },
    },
    methods: {
      ...mapMutations(['addUserData']),
      addUser() {
        if (!this.hasRequiredFields()) {
          return
        }

        let userEmailIsValid = this.isValidEmail(this.userEmail)
        let secondaryEmailIsValid = !this.secondaryEmail || this.isValidEmail(this.secondaryEmail)

        if (!userEmailIsValid) {
          this.userEmailBorderColor = 'red'
        } else {
          this.userEmailBorderColor = '' // Reset border color if email is valid
        }

        if (!secondaryEmailIsValid) {
          if (this.secondaryEmail) {
            this.secondaryEmailBorderColor = 'red'
          }
        } else {
          this.secondaryEmailBorderColor = '' // Reset border color if email is valid
        }

        if (!userEmailIsValid || !secondaryEmailIsValid) {
          return
        }

        this.addUserData({
          id: this.userId || faker.string.uuid(),
          status: {
            value: 'Active',
            props: {
              label: 'Active',
              variant: 'success',
              outlined: true,
            }
          },
          name: this.userName,
          email: this.userEmail,
          user_mobile_phone: this.userMobilePhone,
          office_phone: this.userOfficePhone,
          role: this.userRole,
          last_active: new Date().toISOString(),
        })

        this.$emit('close')
      },
      hasRequiredFields() {
        const requiredFields = ['userRole', 'userName', 'userEmail', 'userMobilePhone']
        let hasMissingField = false

        for (const field of requiredFields) {
          if (!this[field]) {
            this[`${field}BorderColor`] = 'red'
            hasMissingField = true
          }
        }

        return !hasMissingField
      },
      isValidEmail(email) {
        const userEmailDomain = email.split('@')[1]
        return this.approvedDomains.includes(userEmailDomain)
      },
      dismissModal() {
        this.$emit('close')
        this.userRole = ''
        this.userName = ''
        this.userEmail = ''
        this.userSecondaryEmail = ''
        this.userMobilePhone = ''
        this.userOfficePhone = ''
      },
      populateFields() {
        this.userId = this.user.id
        this.userRole = this.user.role
        this.userName = this.user.name
        this.userEmail = this.user.email
        this.userMobilePhone = this.user.user_mobile_phone
        this.userOfficePhone = this.user.office_phone
      },
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
    },
    mounted() {
      if (this.user) {
        this.populateFields()
      }
    },
  }
</script>

<style lang="scss" scoped></style>