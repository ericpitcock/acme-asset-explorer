<template>
  <div class="dashboard">
    <ep-container
      class="dashboard__overview"
      v-bind="commonContainerProps"
    >
      <template #header>
        <ep-header v-bind="commonHeaderProps">
          <template #left>
            <h1>Overview</h1>
          </template>
          <template #right>
            <ep-button
              label="Export"
              kind="ghost"
              :icon-right="{ name: 'export' }"
            />
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
            <h1>Vulnerabilty Summary</h1>
          </template>
        </ep-header>
      </template>
    </ep-container>

    <ep-container
      class="dashboard__asset-map"
      v-bind="commonContainerProps"
      container-padding="0"
    >
      <template #header>
        <ep-header
          v-bind="commonHeaderProps"
          padding="0 3rem"
        >
          <template #left>
            <h1>Asset Locations</h1>
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
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Dashboard',
    components: {
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
        'commonHeaderProps',
        'commonFooterProps',
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
    padding: 3rem;
    gap: 3rem;

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