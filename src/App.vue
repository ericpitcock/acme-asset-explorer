<template>
  <acme-grid v-bind="gridProps">
    <template #header>
      <acme-header
        @menuButtonClicked="toggleLeftPanel"
        @notificationsButtonClicked="toggleRightPanel"
      />
    </template>
    <template #left-panel>
      <div class="left-panel__container">
        <acme-main-nav v-bind="navProps" />
      </div>
    </template>
    <template #content>
      <div class="content-container">
        <router-view />
      </div>
    </template>
    <template #right-panel>
      <div class="right-panel__container">
        <ep-notifications />
      </div>
    </template>
  </acme-grid>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import AcmeGrid from '@/components/AcmeGrid.vue'
  import AcmeHeader from '@/components/AcmeHeader.vue'
  import AcmeMainNav from '@/components/AcmeMainNav.vue'

  export default {
    name: 'AcmeAssetExplorer',
    data() {
      return {
        gridProps: {
          leftPanelOpen: true,
          rightPanelOpen: true,
        },
        navProps: {
          collapsed: false,
        }
      }
    },
    components: {
      AcmeGrid,
      AcmeHeader,
      AcmeMainNav
    },
    methods: {
      ...mapActions(['toggleTheme']),
      toggleLeftPanel() {
        this.navProps.collapsed = !this.navProps.collapsed
      },
      toggleRightPanel() {
        this.gridProps.rightPanelOpen = !this.gridProps.rightPanelOpen
      }
    },
    computed: {
      ...mapState(['theme'])
    }
  }
</script>

<style lang="scss">
  body {
    background: var(--background-1);
  }

  .content-container {
    // min-width: fit-content;
    height: auto;
    min-height: 100%;
    background: var(--background-2);
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
