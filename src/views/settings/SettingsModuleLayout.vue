<template>
  <ep-container v-bind="containerProps">
    <ep-flex flex-props=",,,,,,,2rem,">
      <div class="section-sidebar">
        <slot name="sidebar" />
      </div>
      <div class="section-content">
        <slot
          v-if="showEmptyState"
          name="empty-state"
        >
          <ep-empty-state>
            <p>No data available</p>
            <template #subtext>
              <p>There is no data available for this section.</p>
            </template>
          </ep-empty-state>
        </slot>
        <slot
          v-else
          name="content"
        />
      </div>
    </ep-flex>
  </ep-container>
</template>

<script setup>

  defineOptions({
    name: 'SettingsModuleLayout',
  })

  const props = defineProps({
    emptyStateTitle: {
      type: String,
      default: 'No data available',
    },
    emptyStateDescription: {
      type: String,
      default: ''
    },
    showEmptyState: {
      type: Boolean,
      default: false,
    },
  })

  const containerProps = {
    styles: {
      '--ep-container-padding': '2rem',
      // '--ep-container-border-width': '0rem',
      '--ep-container-bg-color': 'var(--interface-surface)',
    },
  }
</script>

<style lang="scss" scoped>
  .section-sidebar {
    flex: 0 0 20rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 3rem 0 0;
    line-height: 1.5;
  }

  .section-content {
    flex: 1;
  }
</style>
