<template>
  <ep-tooltip :delay="1000">
    <template #tooltip>
      {{ tooltip }}
    </template>
    <ep-status-indicator
      :styles="styles"
      class="text--overflow-hidden"
    >
      {{ value }}
    </ep-status-indicator>
  </ep-tooltip>
</template>

<script setup>
  const props = defineProps({
    styles: {
      type: Object,
      default: () => ({})
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