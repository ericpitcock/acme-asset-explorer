<template>
  <settings-module-layout :show-empty-state="sites.length === 0">
    <template #sidebar>
      <h1>Sites</h1>
      <p class="text--subtle">
        Sites are used to allocate resources.
      </p>
    </template>
    <template #content>
      <ep-flex-container gap="1rem">
        <template
          v-for="({ name, address, phoneNumber }, index) in sites"
          :key="index"
        >
          <div class="site">
            <h2>{{ name }}</h2>
            <div class="address">
              <p
                v-for="line in address"
                :key="line"
              >
                {{ line }}
              </p>
            </div>
            <p>{{ phoneNumber }}</p>
            <ep-flex-container
              padding="1rem 0 0"
              gap="1rem"
              class="site__buttons"
            >
              <ep-button
                label="Edit"
                variant="secondary"
                :icon-left="{ name: 'f-edit' }"
              />
              <ep-button
                variant="secondary"
                :icon-left="{ name: 'f-trash-2' }"
                @click="handleRemoveSite(index)"
              />
            </ep-flex-container>
          </div>
        </template>
      </ep-flex-container>
    </template>
  </settings-module-layout>
</template>

<script setup>
  import { computed, inject } from 'vue'
  import SettingsModuleLayout from '../SettingsModuleLayout.vue'
  import { useStore } from 'vuex'

  defineOptions({
    name: 'SitesModule',
  })

  const store = useStore()

  // ...mapState(['sites']),

  const sites = computed(() => store.state.sites)



  // ...mapMutations(['removeSite']),

  const removeSite = (index) => {
    store.commit('removeSite', index)
  }

  const $epDialog = inject('$epDialog')

  const handleRemoveSite = (index) => {
    $epDialog.open({
      title: 'Warning',
      message: `Are you sure you want to remove the site "${sites.value[index].name}"? All alerts and notifications for this site will be disabled.`, // eslint-disable-line no-template-curly-in-string
      buttons: [
        { variant: 'secondary', text: 'Cancel', action: () => console.log('Cancel clicked') },
        { variant: 'danger', text: 'Remove Site', action: () => removeSite(index) }
      ]
    })
  }
</script>

<style lang="scss" scoped>
  .site {
    flex: 0 1 20rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    background: var(--interface-foreground);
    padding: 3rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    line-height: 1.5;

    &__buttons {
      border-top: 1px solid var(--border-color);
      margin-top: 1rem;
    }
  }
</style>