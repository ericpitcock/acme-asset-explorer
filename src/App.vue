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
        <ep-notifications
          :notifications
          :container-props="containerProps"
          @remove-notification="removeNotification"
          @clear-notifications="clearNotifications"
        />
      </div>
    </template>
  </in-grid>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import InGrid from '@/layouts/InGrid.vue'
  import InHeader from '@/components/InHeader.vue'
  import InMainNav from '@/components/InMainNav.vue'

  const containerProps = {
    styles: {
      '--ep-container-height': '100%',
      '--ep-container-padding': '0 3rem',
      '--ep-container-border-radius': '0',
      '--ep-container-bg-color': 'var(--interface-bg)',
    }
  }

  const store = useStore()
  const notifications = computed(() => store.state.notifications)
  const removeNotification = id => store.commit('removeNotification', id)
  const clearNotifications = () => store.commit('clearNotifications')
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
