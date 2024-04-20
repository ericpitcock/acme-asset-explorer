<template>
  <ep-tooltip>
    <template #tooltip>
      {{ tooltip }}
    </template>
    <ep-status-indicator
      :background-color="backgroundColor"
      :border-color="borderColor"
      class="text--overflow-hidden"
    >
      {{ value }}
    </ep-status-indicator>
  </ep-tooltip>
</template>

<script setup>
  const props = defineProps({
    backgroundColor: {
      type: String,
      default: 'green'
    },
    borderColor: {
      type: String,
      default: 'green'
    },
    tooltip: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  })
</script>