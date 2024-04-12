<template>
  <div class="in-one-column-layout">
    <!-- <div
      v-if="$slots.header"
      class="one-column__header"
    >
      <slot name="header" />
    </div> -->
    <div class="one-column__content">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InOneColumnLayout',
  }
</script>

<style lang="scss" scoped>
  .in-one-column-layout {
    display: flex;
    flex-direction: column;

    &__header {
      // flex: 0 0 6.1rem;
    }

    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 2rem 3rem 20rem 0;
      // need this
      // overflow-x: clip;
    }
  }
</style>
