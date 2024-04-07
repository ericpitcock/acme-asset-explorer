<template>
  <div class="sidebar-layout">
    <div
      class="sidebar-layout__sidebar"
      :style="sidebarStyle"
    >
      <slot name="sidebar" />
    </div>
    <div class="sidebar-layout__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SidebarLayout',
    props: {
      sidebarPadding: {
        type: String,
        default: '0',
      },
    },
    computed: {
      sidebarStyle() {
        return {
          padding: this.sidebarPadding,
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sidebar-layout {
    display: flex;
    width: 100%;

    .sidebar-layout__sidebar {
      flex: 0 0 20rem;
      position: sticky;
      top: 6.1rem;
      align-self: flex-start;
      // padding: 2rem 3rem 0 3rem;
      // border-right: 1px solid var(--border-color);
    }

    .sidebar-layout__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 2rem 3rem 20rem 0;
      // need this
      overflow-x: clip;
    }
  }
</style>
