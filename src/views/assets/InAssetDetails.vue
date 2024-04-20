<template>
  <div class="vulnerabilities">
    <ep-header v-bind="commonPageHeaderProps">
      <template #left>
        <h1>
          <span>
            <router-link
              class="text--link"
              to="/"
            >Assets</router-link></span>
          <span>/</span>
          <span>{{ selectedAsset.id }}</span>
        </h1>
      </template>
    </ep-header>
    <in-sidebar-layout sidebar-padding="2rem 0 0 3rem">
      <template #sidebar>
        sidebar
      </template>
      <template #content>
        <ep-container
          v-bind="commonContainerProps"
          content-padding="3rem 0 1rem 0"
        >
          {{ selectedAsset }}
        </ep-container>
        <ep-container
          v-bind="commonContainerProps"
          content-padding="3rem 0 1rem 0"
        >
          Asset vulns
          <!-- <ep-table /> -->
        </ep-container>
      </template>
    </in-sidebar-layout>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'

  const store = useStore()
  const commonPageHeaderProps = store.state.commonProps.commonPageHeaderProps
  const commonContainerProps = computed(() => store.state.commonProps.commonContainerProps)
  const selectedAsset = computed(() => store.state.selectedAsset)
</script>

<style lang="scss" scoped>
  h1 {
    display: flex;
    gap: 1rem;
  }
</style>