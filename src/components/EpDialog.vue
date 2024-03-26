<template>
  <modal>
    <div class="ep-dialog">
      <div class="ep-dialog-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="ep-dialog-body">
        <p>{{ message }}</p>
      </div>
      <div class="ep-dialog-footer">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          @click="handleButtonClick(button.action)"
        >
          {{ button.text }}
        </button>
        <!-- <ep-button
          variant="secondary"
          @click="closeDialog"
        >Cancel</ep-button> -->
      </div>
    </div>
  </modal>
</template>

<script>
  import Modal from '@/components/Modal.vue'

  export default {
    name: 'EpDialog',
    components: {
      Modal
    },
    emits: ['close'],
    props: {
      title: String,
      message: String,
      buttons: Array
    },
    methods: {
      closeDialog() {
        // Emit an event to indicate closing the dialog
        this.$emit('close')
      },
      handleButtonClick(action) {
        // Execute the action associated with the button
        if (action) {
          action()
        }
        // Close the dialog after executing the action
        this.closeDialog()
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* .ep-dialog-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: var(--interface-surface);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                } */
  .ep-dialog {
    background-color: var(--interface-surface);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
    padding: 20px;
  }

  .ep-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ep-dialog-body {
    margin-top: 10px;
  }

  .ep-dialog-footer {
    margin-top: 20px;
    text-align: right;
  }

  button {
    margin-left: 10px;
  }
</style>
