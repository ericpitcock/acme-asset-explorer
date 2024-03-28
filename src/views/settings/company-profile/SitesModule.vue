<template>
  <settings-module-layout>
    <template #sidebar>
      <h1>Sites</h1>
      <p class="text--subtle">Sites are used to allocate resources.</p>
    </template>
    <template #content>
      <ep-flex-container gap="1rem">
        <template v-for="{ name, address, phoneNumber } in sites">
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
            <ep-flex-container gap="1rem">
              <ep-button
                label="Edit"
                variant="secondary"
                :icon-left="{ name: 'f/edit' }"
              />
              <ep-button
                variant="secondary"
                :icon-left="{ name: 'f/trash-2' }"
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
  }
</style>