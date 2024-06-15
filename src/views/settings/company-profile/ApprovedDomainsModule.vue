<template>
  <settings-module-layout :show-empty-state="approvedDomains.length === 0">
    <template #sidebar>
      <h1>Approved Domains </h1>
      <p class="text--subtle">
        Insight access is restricted to accounts registered under
        approved domains only.
      </p>
      <p v-if="changesUpdated">
        Changes saved!
      </p>
    </template>
    <template #content>
      <ep-flex flex-props=",,column,,,flex-start,,,">
        <div
          v-for="(domain, index) in approvedDomains"
          :key="index"
          class="approved-domain-container"
        >
          <ep-input
            v-model="approvedDomains[index]"
            size="large"
            placeholder="Enter a domain…"
            @input="onInput"
            @blur="onBlur"
          />
          <ep-button
            :icon-left="{ name: 'f-trash-2' }"
            :classes="['ep-button-variant-subtle-ghost']"
            @click="handleRemoveDomain(index)"
          />
        </div>
        <ep-button
          :icon-left="{ name: 'f-plus' }"
          @click="handleAddDomain"
        />
      </ep-flex>
    </template>
  </settings-module-layout>
</template>

<script setup>
  import { computed, inject, nextTick, ref, watch } from 'vue'
  import SettingsModuleLayout from '../SettingsModuleLayout.vue'
  import { useStore } from 'vuex'

  defineOptions({
    name: 'ApprovedDomainsModule',
  })

  const changesUpdated = ref(false)
  const isTyping = ref(false)

  const store = useStore()
  const approvedDomains = computed(() => store.state.approvedDomains)

  const addApprovedDomain = (domain) => {
    store.commit('addApprovedDomain', domain)
  }

  const removeApprovedDomain = (index) => {
    store.commit('removeApprovedDomain', index)
  }

  const handleAddDomain = () => {
    addApprovedDomain('')

    nextTick(() => {
      const inputs = document.querySelectorAll('.approved-domain-container input')
      inputs[inputs.length - 1].focus()
    })
  }

  const onBlur = () => {
    changesUpdated.value = false
  }

  const onInput = (value) => {
    if (!isTyping.value) {
      isTyping.value = true
    }
    setTimeout(() => {
      isTyping.value = false
    }, 1000)
  }

  const $epDialog = inject('$epDialog')

  const handleRemoveDomain = (index) => {
    // if the input is empty, remove the domain without warning
    if (!approvedDomains.value[index]) {
      removeApprovedDomain(index)
      return
    }

    // if the input is not empty, confirm the user wants to remove the domain
    $epDialog.open({
      title: `Delete domain "${approvedDomains.value[index]}"?`,
      message: 'All users registered under this domain will be deactivated.',
      buttons: [
        {
          text: 'Cancel',
          action: () => console.log('Cancel clicked')
        },
        {
          text: 'Delete Domain',
          classes: ['button-variant-danger'],
          action: () => removeApprovedDomain(index)
        }
      ]
    })
  }

  const handleSave = () => {
    console.log('Save Changes')
  }

  watch(approvedDomains, (newValue, oldValue) => {
    setTimeout(() => {
      changesUpdated.value = true
    }, 3000)

    setTimeout(() => {
      changesUpdated.value = false
    }, 5000)
  }, { deep: true })
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 1.5rem;
    // padding-bottom: 0.5rem;
    // border-bottom: 1px solid var(--border-color);
  }

  .approved-domain-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    align-self: stretch;
    max-width: 40rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);

    &:first-of-type {
      border-top: 1px solid var(--border-color);
    }

    &:last-of-type {
      margin-bottom: 1rem;
    }

    :deep(.ep-input-styler__container) {
      align-self: flex-start;
      flex: 0 0 40rem;
    }

    .ep-button {
      width: 4rem;
    }
  }
</style>