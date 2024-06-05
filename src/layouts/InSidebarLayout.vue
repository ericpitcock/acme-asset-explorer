<template>
  <div class="in-sidebar-layout">
    <div
      class="sidebar-layout__sidebar"
      :style="sidebarStyle"
    >
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
  import { computed, provide, ref } from 'vue'

  defineOptions({
    name: 'InSidebarLayout',
  })

  const props = defineProps({
    sidebarPadding: {
      type: String,
      default: '0',
    },
  })

  const sidebarStyle = computed(() => {
    return {
      padding: props.sidebarPadding,
    }
  })

  const sidebarLayoutContent = ref(null)

  const sidebarScrollRef = ref({
    top: 0,
    left: 0,
  })

  const emit = defineEmits(['scroll'])

  const onScroll = () => {
    const { scrollTop, scrollLeft } = sidebarLayoutContent.value

    sidebarScrollRef.value = {
      top: scrollTop,
      left: scrollLeft,
    }

    emit('scroll', sidebarScrollRef.value)
  }

  // provide('sidebarScroll', sidebarScrollRef)
</script>

<style lang="scss" scoped>
  .in-sidebar-layout {
    display: flex;
    width: 100%;

    .sidebar-layout__sidebar {
      flex: 0 0 20rem;
      position: sticky;
      top: 6.1rem;
      height: calc(100vh - 10.2rem);
      align-self: flex-start;
      background: var(--interface-bg);
      border-right: 1px solid var(--border-color);
      z-index: var(--z-index--sticky);
    }

    .sidebar-layout__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background: var(--interface-surface);
      // padding: 2rem 3rem 20rem 0;
      // need this
      // overflow-x: clip;
    }
  }
</style>
