<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
  export default {
    name: 'Modal',
  }
</script>

<style lang="scss" scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 6rem;
    background-color: var(--modal-overlay-background);
    z-index: var(--z-index--modal);
  }
</style>
