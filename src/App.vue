<template>
  <in-grid>
    <template #header>
      <in-header />
    </template>
    <template #left-panel>
      <div class="left-panel__container">
        <in-main-nav />
      </div>
    </template>
    <template #content>
      <div class="content-container">
        <router-view />
      </div>
    </template>
    <template #right-panel>
      <div class="right-panel__container">
        <ep-notifications :container-props="containerProps" />
      </div>
    </template>
  </in-grid>
</template>

<script>
  import InGrid from '@/components/InGrid.vue'
  import InHeader from '@/components/InHeader.vue'
  import InMainNav from '@/components/InMainNav.vue'

  export default {
    name: 'AcmeAssetExplorer',
    components: {
      InGrid,
      InHeader,
      InMainNav
    },
    computed: {
      containerProps() {
        return {
          borderWidth: '0',
          borderRadius: '0',
        }
      },
    },
  }
</script>

<style lang="scss">
  body {
    background: var(--interface-bg);
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
