<template>
  <settings-module-layout :show-empty-state="sites.length === 0">
    <template #sidebar>
      <h1>Sites</h1>
      <p class="text--subtle">
        Sites are used to allocate resources.
      </p>
    </template>
    <template #content>
      <ep-flex flex-props=",,,,,,,2rem,">
        <template
          v-for="({ id, name, address, phoneNumber }) in sites"
          :key="id"
        >
          <div class="site">
            <div class="site__action-menu">
              <ep-dropdown
                :context="{ id, name }"
                v-bind="siteActionMenuProps"
              />
            </div>
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
          </div>
        </template>
      </ep-flex>
    </template>
  </settings-module-layout>
</template>

<script setup>
  import { computed, inject, provide } from 'vue'
  import SettingsModuleLayout from '../SettingsModuleLayout.vue'
  import { useStore } from 'vuex'

  defineOptions({
    name: 'SitesModule',
  })

  const store = useStore()

  const sites = computed(() => store.state.sites)

  provide('contextData', sites.value)

  const siteActionMenuProps = {
    size: 'small',
    showOnHover: true,
    menuItems: [
      {
        label: 'Edit',
        onClick: (item) => {
          console.log('Edit clicked', item)
        }
      },
      {
        label: 'Delete',
        onClick: (item) => {
          handleRemoveSite(item.contextData.id, item.contextData.name)
        }
      }
    ],
    containerProps: {
      '--ep-container-border-radius': 'var(--border-radius)',
      '--ep-container-border-width': '0.1rem',
      '--ep-container-border-color': 'var(--border-color--lighter)',
    },
    buttonProps: {
      label: '',
      iconLeft: {
        name: 'dots-vertical',
        styles: { '--ep-icon-stroke-width': 3 }
      },
      iconRight: null,
      classes: ['ep-button-variant-subtle-ghost'],
      size: 'small',
    },
  }

  const removeSite = (id) => {
    store.commit('removeSite', id)
  }

  const $epDialog = inject('$epDialog')

  const handleRemoveSite = (id, name) => {
    console.log('handleRemoveSite', id, name)
    $epDialog.open({
      title: `Delete site "${name}"?`,
      message: 'All alerts and notifications for this site will be disabled.',
      buttons: [
        {
          text: 'Cancel',
          action: () => console.log('Cancel clicked')
        },
        {
          text: 'Delete Site',
          classes: ['button-variant-danger'],
          action: () => removeSite(id)
        }
      ]
    })
  }
</script>

<style lang="scss" scoped>
  .site {
    position: relative;
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

    &__action-menu {
      position: absolute;
      top: 1rem;
      right: 0.2rem;
    }
  }
</style>