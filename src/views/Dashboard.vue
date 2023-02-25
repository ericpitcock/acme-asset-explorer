<template>
  <div class="dashboard">
    <ep-container
      class="dashboard__summary"
      padding="3rem"
      v-bind="commonContainerProps"
    >
      <h1>Summary (TBD)</h1>
    </ep-container>
    <ep-container
      class="dashboard__vulnerabilities"
      padding="3rem"
      v-bind="commonContainerProps"
    >
      <h1>Vulnerabilty summary (TBD)</h1>
    </ep-container>
    <ep-container
      class="dashboard__asset-map"
      v-bind="commonContainerProps"
    >
      <ep-map
        :map-center="[-40.954169, 38.298895]"
        :map-zoom="2"
        :navigation-control="false"
        :scroll-zoom="false"
      />
    </ep-container>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    components: {
    },
    data() {
      return {
        commonContainerProps: {
          backgroundColor: 'var(--background-1)',
          borderRadius: 'var(--border-radius)',
        }
      }
    }
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

    &__summary {
      grid-area: top;
    }

    &__vulnerabilities {
      grid-area: middle;
    }

    &__asset-map {
      grid-area: bottom;
    }
}</style>