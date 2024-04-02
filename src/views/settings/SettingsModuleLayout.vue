<template>
  <ep-container container-padding="3rem">
    <ep-flex-container gap="2rem">
      <div class="section-sidebar">
        <slot name="sidebar"></slot>
      </div>
      <div class="section-content">
        <slot
          v-if="showEmptyState"
          name="empty-state"
        >
          <ep-empty-state
            message="No data available"
            subtext="There is no data available for this section."
          />
        </slot>
        <slot
          v-else
          name="content"
        />
      </div>
    </ep-flex-container>
  </ep-container>
</template>

<script>
  export default {
    name: 'SettingsModuleLayout',
    props: {
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
    }
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
    // border-right: 1px solid var(--border-color);
  }

  .section-content {
    flex: 1;
  }
</style>