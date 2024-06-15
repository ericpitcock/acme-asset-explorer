<template>
  <in-modal padding="6rem 0 0 0">
    <div class="in-dialog">
      <div class="in-dialog-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="in-dialog-body">
        <p>{{ message }}</p>
      </div>
      <div class="in-dialog-footer">
        <ep-button
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          :label="button.text"
          :classes="button.classes"
          @click="handleButtonClick(button.action)"
        />
      </div>
    </div>
  </in-modal>
</template>

<script>
  import InModal from '@/components/InModal.vue'

  export default {
    name: 'InDialog',
    components: {
      InModal
    },
    props: {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      buttons: {
        type: Array,
        required: true
      },
      classes: {
        type: [String, Object, Array],
        default: ''
      }
    },
    emits: ['close'],
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
  .in-dialog {
    max-width: 40rem;
    background-color: var(--interface-surface);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 3rem;
  }

  .in-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .in-dialog-body {
    line-height: 1.5;
    margin-top: 10px;
  }

  .in-dialog-footer {
    margin-top: 20px;
    text-align: right;
  }

  button {
    margin-left: 10px;
  }
</style>
