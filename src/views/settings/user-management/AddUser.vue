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
          :border-color="userNameBorderColor"
        />
        <p class="font-size--small text--subtle">
          {{ approvedDomainsMessage }}
        </p>
        <ep-input
          v-model="userEmail"
          label="Email"
          size="large"
          :border-color="userEmailBorderColor"
          :disabled="approvedDomains.length === 0"
        />
        <ep-input
          v-model="secondaryEmail"
          label="Secondary Email (Optional)"
          size="large"
          :border-color="secondaryEmailBorderColor"
          :disabled="approvedDomains.length === 0"
        />
        <p class="font-size--small text--subtle">
          Mobile phone is used for authentication purposes.
        </p>
        <ep-input
          v-model="userMobilePhone"
          label="Mobile Phone"
          size="large"
          :border-color="userMobilePhoneBorderColor"
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

  watch(() => userName.value, () => {
    console.log('userName', userName.value)
  })


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


  // ...mapMutations(['addUserData']),
  const addUser = () => {
    // if (!hasRequiredFields()) {
    //   // console.log('Missing required fields')
    //   return
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

  const hasRequiredFields = () => {
    const requiredFields = ['userRole', 'userName', 'userEmail', 'userMobilePhone']
    let hasMissingField = false

    for (const field of requiredFields) {
      if (![field].value) {
        [`${field}BorderColor`].value = 'red'
        hasMissingField = true
        console.log(`${field} is missing`)
        console.log(`${field}BorderColor`, [`${field}BorderColor`].value)
      }
    }

    return !hasMissingField
  }

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


  // watch(() => userRole.value, () => {
  //   userRoleBorderColor.value = null
  // })

  // watch(() => userName.value, () => {
  //   userNameBorderColor.value = null
  // })

  // watch(() => userEmail.value, () => {
  //   userEmailBorderColor.value = null
  // })

  // watch(() => userMobilePhone.value, () => {
  //   userMobilePhoneBorderColor.value = null
  // })

  onMounted(() => {
    if (props.user) {
      populateFields()
    }
  })
</script>

<style lang="scss" scoped></style>