<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      padding: {
        type: String,
        default: '0',
      },
      modalHeight: {
        type: String,
        default: 'auto',
      },
    },
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
    padding: v-bind(padding);
    background-color: var(--modal-overlay-background);
    z-index: var(--z-index--modal);
    backdrop-filter: blur(3px);

    &__content {
      height: v-bind(modalHeight);
      box-shadow: var(--box-shadow--modal);
    }
  }
</style>
