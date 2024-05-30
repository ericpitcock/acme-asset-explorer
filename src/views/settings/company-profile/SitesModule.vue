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
        <template v-for="({ name, address, phoneNumber }, index) in sites">
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

<script>
  import SettingsModuleLayout from '../SettingsModuleLayout.vue'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'SitesModule',
    components: { SettingsModuleLayout },
    computed: {
      ...mapState(['sites']),
    },
    methods: {
      ...mapMutations(['removeSite']),
      handleRemoveSite(index) {
        this.$epDialog.open({
          title: 'Warning',
          message: `Are you sure you want to remove the site "${this.sites[index].name}"? All alerts and notifications for this site will be disabled.`, // eslint-disable-line no-template-curly-in-string
          buttons: [
            { variant: 'secondary', text: 'Cancel', action: () => console.log('Cancel clicked') },
            { variant: 'danger', text: 'Remove Site', action: () => this.removeSite(index) }
          ]
        })
      },
    },
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