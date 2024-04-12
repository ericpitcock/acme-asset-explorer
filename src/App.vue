<template>
  <acme-grid>
    <template #header>
      <acme-header />
    </template>
    <template #left-panel>
      <div class="left-panel__container">
        <acme-main-nav />
      </div>
    </template>
    <template #content>
      <div class="content-container">
        <router-view />
      </div>
    </template>
    <template #right-panel>
      <div class="right-panel__container">
        <ep-notifications :containerProps="containerProps" />
      </div>
    </template>
  </acme-grid>
</template>

<script>
  import AcmeGrid from '@/components/AcmeGrid.vue'
  import AcmeHeader from '@/components/AcmeHeader.vue'
  import AcmeMainNav from '@/components/AcmeMainNav.vue'

  export default {
    name: 'AcmeAssetExplorer',
    components: {
      AcmeGrid,
      AcmeHeader,
      AcmeMainNav
    },
    computed: {
      containerProps() {
        return {
          borderWidth: '0',
          borderRadius: '0',
        }
      },
    }
  }
</script>

<style lang="scss">
  body {
    background: var(--interface-bg);
  }

  h1.page-head {
    font-size: var(--font-size--large);
    font-variation-settings: var(--font-weight--light);
    color: var(--text-color--primary);
  }

  .content-container {
    height: auto;
    min-height: 100%;
    background: var(--interface-bg);
  }

  .left-panel__container {
    height: 100%;
    border-right: 1px solid var(--border-color);
  }

  .right-panel__container {
    height: 100%;
    border-left: 1px solid var(--border-color);
  }
</style>
