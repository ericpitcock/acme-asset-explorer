<template>
  <div class="app-layout">
    <div class="left">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="grid">
        <div class="left-panel">
          <slot name="left-panel" />
        </div>
        <div
          ref="content"
          class="content"
          @scroll="onScroll"
        >
          <slot name="content" />
        </div>
      </div>
    </div>
    <div
      v-if="rightPanelOpen"
      class="right-panel"
    >
      <slot name="right-panel" />
    </div>
  </div>
</template>

<script setup>
  import { computed, nextTick, provide, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'

  defineOptions({
    name: 'InGrid',
  })

  const store = useStore()

  const rightPanelOpen = computed(() => {
    return store.state.rightPanelOpen
  })

  const route = useRoute()
  const content = ref(null)

  watch(route, (to, from) => {
    nextTick(() => {
      content.value.scrollTop = 0
    })
  })

  // provide scroll position of .content to children
  const contentScrollTop = ref(0)

  const onScroll = () => {
    contentScrollTop.value = content.value.scrollTop
  }

  provide('contentScrollTop', contentScrollTop)
</script>

<style lang="scss" scoped>
  .app-layout {
    width: 100vw;
    height: 100vh;
    display: flex;

    .left {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      overflow: auto;

      .header {
        flex: 0 0 41px;
      }

      .grid {
        flex: 1;
        display: flex;
        overflow-y: scroll;

        .left-panel {
          overflow: auto;
          z-index: var(--z-index--fixed);
        }

        .content {
          flex: 1;
          height: 100%;
          overflow: auto;
        }
      }
    }

    .right-panel {
      flex: 0 0 361px;
      overflow: auto;
    }
  }
</style>