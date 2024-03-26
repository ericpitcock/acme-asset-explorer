<template>
  <div class="sidebar-layout">
    <div class="sidebar-layout__sidebar">
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
  }
</script>

<style lang="scss" scoped>
  .sidebar-layout {
    display: flex;
    width: 100%;
    height: 100%;

    // background-color: red;
    // height: 100%;
    // background-color: red;
    .sidebar-layout__sidebar {
      flex: 0 0 20rem;
      // height: 100%;
      border-right: 1px solid var(--border-color);
      background: red;
    }

    .sidebar-layout__content {
      flex: 1;
      background-color: blue;
      // padding: 20px;
    }
  }
</style>
