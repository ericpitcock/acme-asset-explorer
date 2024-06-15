<template>
  <div
    class="in-sidebar-layout"
    :style="styles"
  >
    <div class="sidebar-layout__sidebar">
      <slot name="sidebar" />
    </div>
    <div
      ref="sidebarLayoutContent"
      class="sidebar-layout__content"
      @scroll="onScroll"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'

  defineOptions({
    name: 'InSidebarLayout',
  })

  const props = defineProps({
    styles: {
      type: Object,
      default: () => ({}),
    },
  })

  // const sidebarStyle = computed(() => {
  //   return {
  //     padding: props.sidebarPadding,
  //   }
  // })
</script>

<style lang="scss" scoped>
  .in-sidebar-layout {
    --in-sidebar-sidebar-padding: 0;
    --in-sidebar-content-padding: 0;
    position: relative;
    display: flex;
    width: 100%;

    .sidebar-layout__sidebar {
      flex: 0 0 20rem;
      position: sticky;
      top: 6.1rem;
      height: calc(100vh - 10.2rem);
      align-self: flex-start;
      background: var(--interface-surface);
      padding: var(--in-sidebar-sidebar-padding);
      border-right: 1px solid var(--border-color);
      z-index: var(--z-index--sticky);
    }

    .sidebar-layout__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: var(--in-sidebar-content-padding);
      background: var(--interface-surface);
    }
  }
</style>
