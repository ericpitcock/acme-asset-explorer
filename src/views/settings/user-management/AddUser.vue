<template>
  <ep-container v-bind="containerProps">
    <template #header>
      <ep-header>
        <template #left>
          <h1>{{ modalTitle }}</h1>
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
          v-model="userRole"
          placeholder="Choose a role…"
          size="large"
          :options="roleOptions"
          :border-color="userRoleBorderColor"
          select-id="userRole"
        />
        <ep-input
          v-model="userName"
          label="Name"
          size="large"
          :styles="{ '--ep-input-border-color': userNameBorderColor }"
        />
        <p class="font-size--small text--subtle">
          {{ approvedDomainsMessage }}
        </p>
        <ep-input
          v-model="userEmail"
          label="Email"
          size="large"
          :styles="{ '--ep-input-border-color': userEmailBorderColor }"
          :disabled="approvedDomains.length === 0"
        />
        <ep-input
          v-model="secondaryEmail"
          label="Secondary Email (Optional)"
          size="large"
          :styles="{ '--ep-input-border-color': secondaryEmailBorderColor }"
          :disabled="approvedDomains.length === 0"
        />
        <p class="font-size--small text--subtle">
          Mobile phone is used for authentication purposes.
        </p>
        <ep-input
          v-model="userMobilePhone"
          label="Mobile Phone"
          size="large"
          :styles="{ '--ep-input-border-color': userMobilePhoneBorderColor }"
        />
        <ep-input
          v-model="userOfficePhone"
          label="Office Phone (Optional)"
          size="large"
        />
      </ep-flex-container>
      <roles-table :selected-role="userRole" />
    </ep-flex-container>
    <template #footer>
      <ep-footer right-gap="1rem">
        <template #right>
          <ep-button
            label="Cancel"
            @click="dismissModal"
          />
          <EpButton
            :label="buttonLabel"
            @click="addUser"
          />
        </template>
      </ep-footer>
    </template>
  </ep-container>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import RolesTable from './RolesTable.vue'
  import { faker } from '@faker-js/faker'

  const store = useStore()
  const { approvedDomains } = store.state

  defineOptions({
    name: 'AddUser',
  })

  const props = defineProps({
    user: {
      type: Object,
      default: () => ({}),
    },
  })

  const emit = defineEmits(['close'])

  const containerProps = {
    styles: {
      '--ep-container-width': '90rem',
      '--ep-container-padding': '0 3rem 1rem 3rem',
      '--ep-container-content-padding': '3rem 0',
      '--ep-container-bg-color': 'var(--interface-surface)',
    }
  }

  const roleOptions = [
    { label: 'User', value: 'User' },
    { label: 'Partner', value: 'Partner' },
    { label: 'Admin', value: 'Admin' },
  ]

  const userId = ref('')
  const userRole = ref('')
  const userName = ref('')
  const userEmail = ref('')
  const secondaryEmail = ref('')
  const userMobilePhone = ref('')
  const userOfficePhone = ref('')

  const userRoleBorderColor = ref(null)
  const userNameBorderColor = ref(null)
  const userEmailBorderColor = ref(null)
  const secondaryEmailBorderColor = ref(null)
  const userMobilePhoneBorderColor = ref(null)

  const approvedDomainsMessage = computed(() => {
    return approvedDomains.length
      ? `Approved domains: ${approvedDomains.join(', ')}`
      : 'You don’t have any approved domains. Add a domain to company profile to add a new user.'
  })

  const buttonLabel = computed(() => {
    return props.user ? 'Save Changes' : 'Add User'
  })

  const modalTitle = computed(() => {
    return props.user ? `Edit User: ${userId.value}` : 'Add User'
  })

  const addUser = () => {
    if (hasMissingRequiredFields.value) {
      console.log('Missing required fields')
      console.log(hasMissingRequiredFields.value)

      // Set border color to red for missing fields
      hasMissingRequiredFields.value.forEach((field) => {
        switch (field) {
          case 'userRole':
            userRoleBorderColor.value = 'red'
            break
          case 'userName':
            userNameBorderColor.value = 'red'
            break
          case 'userEmail':
            userEmailBorderColor.value = 'red'
            break
          case 'userMobilePhone':
            userMobilePhoneBorderColor.value = 'red'
            break
        }
      })
      return
    }

    // if name is empty or invalid, set border color to red
    // if (!userName.value) {
    //   userNameBorderColor.value = 'red'
    // }

    // let userEmailIsValid = isValidEmail(userEmail.value)
    // let secondaryEmailIsValid = !secondaryEmail.value || isValidEmail(secondaryEmail.value)

    // if (!userEmailIsValid) {
    //   userEmailBorderColor.value = 'red'
    // } else {
    //   userEmailBorderColor.value = '' // Reset border color if email is valid
    // }

    // if (!secondaryEmailIsValid) {
    //   if (secondaryEmail.value) {
    //     secondaryEmailBorderColor.value = 'red'
    //   }
    // } else {
    //   secondaryEmailBorderColor.value = '' // Reset border color if email is valid
    // }

    // if (!userEmailIsValid || !secondaryEmailIsValid) {
    //   return
    // }

    store.commit('addUserData', {
      id: userId.value || faker.string.uuid(),
      role: {
        value: userRole.value,
        props: {
          label: userRole.value,
          styles: {
            '--ep-badge-bg-color': 'transparent',
            '--ep-badge-border-color': 'var(--color-status--success-bg)',
          }
        }
      },
      status: 'Active',
      name: {
        value: userName.value,
        props: {
          value: userName.value,
          tooltip: 'Active',
          styles: {
            '--ep-status-indicator-dot-bg': 'var(--color-status--success-bg)',
            '--ep-status-indicator-dot-border': 'var(--ep-status-indicator-dot-bg)'
          }
        }
      },
      email: userEmail.value,
      user_mobile_phone: userMobilePhone.value,
      office_phone: userOfficePhone.value,
      last_active: new Date().toISOString(),
    })

    emit('close')
  }

  const hasMissingRequiredFields = computed(() => {
    const requiredFields = [
      { field: userRole, name: 'userRole' },
      { field: userName, name: 'userName' },
      { field: userEmail, name: 'userEmail' },
      { field: userMobilePhone, name: 'userMobilePhone' }
    ]

    // Filter out the missing fields
    const missingFields = requiredFields.filter(({ field }) => !field.value)

    // Return an array of missing field names if there are any, otherwise return false
    return missingFields.length > 0 ? missingFields.map(({ name }) => name) : false
  })

  const isValidEmail = (email) => {
    const userEmailDomain = email.split('@')[1]
    return approvedDomains.includes(userEmailDomain)
  }

  const dismissModal = () => {
    emit('close')
    userRole.value = ''
    userName.value = ''
    userEmail.value = ''
    secondaryEmail.value = ''
    userMobilePhone.value = ''
    userOfficePhone.value = ''
  }

  const populateFields = () => {
    userId.value = props.user.id
    userRole.value = props.user.role.value
    userName.value = props.user.name.value
    userEmail.value = props.user.email
    userMobilePhone.value = props.user.user_mobile_phone
    userOfficePhone.value = props.user.office_phone
  }

  watch(() => userRole.value, () => {
    userRoleBorderColor.value = null
  })

  watch(() => userName.value, () => {
    userNameBorderColor.value = null
  })

  watch(() => userEmail.value, () => {
    userEmailBorderColor.value = null
  })

  watch(() => userMobilePhone.value, () => {
    userMobilePhoneBorderColor.value = null
  })

  onMounted(() => {
    if (props.user) {
      populateFields()
    }
  })
</script>

<style lang="scss" scoped></style>