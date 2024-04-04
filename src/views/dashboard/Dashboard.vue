<template>
  <one-column-layout>
    <ep-header v-bind="commonPageHeaderProps">
      <template #left>
        <p>Dashboard</p>
      </template>
      <template #right>
        <ep-date-picker
          mode="range"
          positionX="right"
          :inputProps="{
            size: 'large',
            backgroundColor: 'var(--interface-foreground)'
          }"
        />
        <ep-button
          label="Export"
          kind="ghost"
          size="large"
          :icon-right="{ name: 'export' }"
        />
      </template>
    </ep-header>
    <div class="dashboard">
      <ep-container
        class="dashboard__overview"
        v-bind="commonContainerProps"
      >
        <template #header>
          <ep-header v-bind="commonHeaderProps">
            <template #left>
              <p>Overview</p>
            </template>
          </ep-header>
        </template>
      </ep-container>
      <ep-container
        class="dashboard__vulnerabilities"
        v-bind="commonContainerProps"
      >
        <template #header>
          <ep-header v-bind="commonHeaderProps">
            <template #left>
              <p>Vulnerabilty Summary</p>
            </template>
          </ep-header>
        </template>
      </ep-container>

      <ep-container
        class="dashboard__asset-map"
        v-bind="commonContainerProps"
        overflow="hidden"
        container-padding="0"
      >
        <template #header>
          <ep-header
            v-bind="commonHeaderProps"
            padding="0 3rem"
            style="border-radius: var(--border-radius--large) var(--border-radius--large) 0 0;"
          >
            <template #left>
              <p>Asset Locations</p>
            </template>
          </ep-header>
        </template>
        <ep-map
          :map-center="[-40.954169, 38.298895]"
          :map-zoom="2"
          :navigation-control="false"
          :scroll-zoom="false"
          :map-style="mapStyle"
        />
      </ep-container>
    </div>
  </one-column-layout>
</template>

<script>
  import OneColumnLayout from '@/layouts/OneColumnLayout.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'Dashboard',
    components: {
      OneColumnLayout
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
        'commonHeaderProps',
        'commonPageHeaderProps',
        // 'commonFooterProps',
        'theme'
      ]),
      mapStyle() {
        return this.theme === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10'
      }
    },
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 200px 200px 400px;
    grid-template-areas:
      "top top top"
      "middle middle middle"
      "bottom bottom bottom";
    height: 100%;
    width: 100%;
    padding: 2rem 2rem 20rem 2rem;
    gap: 2rem;

    &__overview {
      grid-area: top;
    }

    &__vulnerabilities {
      grid-area: middle;
    }

    &__asset-map {
      grid-area: bottom;
    }
  }
</style>