<template>
  <div class="app-header">
    <div class="app-controls app-controls--left">
      <ep-button
        :classes="['in-header-button']"
        :icon-left="{ name: 'menu' }"
        @click="toggleleftPanelCollapsedUser"
      />
      <ep-dropdown v-bind="userDropdownProps" />
      <ep-button
        :classes="['in-header-button']"
        label="ACME Corp"
        to="/settings/company-profile"
      />
    </div>
    <ep-button-group
      v-if="isTimeBased"
      :active="3"
      size="default"
      v-bind="timeframeButtons"
    />
    <div class="app-controls app-controls--right">
      <ep-button
        :classes="['in-header-button']"
        :icon-left="themeIcon"
        @click="toggleTheme"
      />
      <ep-dropdown v-bind="helpDropdownProps" />
      <ep-button
        :classes="['in-header-button']"
        :label="''"
        :icon-right="null"
        :icon-left="{ name: 'notifications' }"
        :class="{ 'hasNotifications': hasActiveNotifications }"
        @click="toggleRightPanel"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const isTimeBased = computed(() => {
    const routeNames = [
      'assets',
      'asset-details',
      'vulnerabilities',
      'vulnerability-details'
    ]
    return routeNames.includes(route.name)
  })

  const timeframeButtons = computed(() => {
    const items = [
      { label: 'Today' },
      { label: 'This Week' },
      { label: '7D' },
      { label: '30D' },
      { label: '60D' },
      { label: '90D' },
      { label: 'Custom' }
    ]

    const styles = {
      '--ep-button-bg-color': 'hsla(0, 0%, 0%, 0.1)',
      '--ep-button-text-color': 'var(--text-color--loud)',
      '--ep-button-border-width': '0.1rem',
      '--ep-button-border-style': 'solid',
      '--ep-button-border-color': 'hsla(0, 0%, 100%, 0.1)',
      '--ep-button-border-radius': '0.3rem',
      '--ep-button-hover-bg-color': 'hsla(0, 0%, 100%, 0.05)',
      '--ep-button-hover-text-color': 'var(--text-color--loud)',
      '--ep-button-hover-border-color': 'hsla(0, 0%, 100%, 0.1)',
      '--ep-button-active-bg-color': 'var(--interface-foreground)',
      '--ep-button-active-text-color': 'var(--text-color)',
      '--ep-button-active-border-color': 'hsla(0, 0%, 100%, 0.1)',
      '--ep-button-group-inactive-text-color': 'hsla(0, 0%, 100%, 0.5)',
    }

    return {
      items,
      styles
    }
  })

  const userDropdownProps = {
    buttonProps: {
      classes: ['in-header-button'],
      label: '',
      iconRight: null,
      iconLeft: { name: 'user' }
    },
    containerProps: {
      backgroundColor: 'var(--interface-overlay)',
      borderRadius: 'var(--border-radius)',
      borderColor: 'var(--border-color--lighter)'
    },
    menuItems: [
      {
        label: 'User Profile',
        iconLeft: { name: 'user' },
        bind: {
          to: '/settings/user-management'
        }
      },
      {
        divider: true
      },
      {
        label: 'Sign Out',
        iconLeft: { name: 'arrow-right' },
        bind: {
          to: '/login'
        }
      }
    ]
  }

  const helpDropdownProps = {
    alignRight: true,
    buttonProps: {
      classes: ['in-header-button'],
      label: '',
      iconRight: null,
      iconLeft: { name: 'help' }
    },
    containerProps: {
      backgroundColor: 'var(--interface-overlay)',
      borderRadius: 'var(--border-radius)',
      borderColor: 'var(--border-color--lighter)'
    },
    menuItems: [
      {
        label: 'Documentation',
        iconLeft: { name: 'help' }
      },
      {
        label: 'Contact Support',
        iconLeft: { name: 'support' }
      }
    ]
  }

  const store = useStore()
  const hasActiveNotifications = computed(() => store.getters.hasActiveNotifications)
  const theme = computed(() => store.state.theme)

  const themeIcon = computed(() => {
    return theme.value == 'dark' ? { name: 'light-mode' } : { name: 'dark-mode' }
  })

  const toggleTheme = () => {
    store.dispatch('toggleTheme')
  }

  const toggleleftPanelCollapsedUser = () => {
    store.commit('toggleleftPanelCollapsedUser')
  }

  const toggleRightPanel = () => {
    store.commit('toggleRightPanel')
  }
</script>

<style lang="scss" scoped>
  .app-header {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 6px;
    background: var(--app-header-background);
    border-bottom: 1px solid var(--border-color);
    z-index: var(--z-index--fixed);
    // hack header colors to invert text on dark header
    // html[data-color-theme='light'] & :not(.ep-dropdown__content):not(.ep-dropdown__content *) {
    //   color: var(--text-color--inverse);
    // }
  }

  .hasNotifications {
    position: relative;

    &:after {
      position: absolute;
      top: 0.1rem;
      right: 0.25rem;
      content: '';
      background: var(--color-status--success-bg);
      width: 7px;
      height: 7px;
      border-radius: 5px;
    }
  }

  .app-controls {
    display: flex;
    align-items: center;

    &--left {
      p {
        margin-left: 1rem;
        cursor: pointer;
      }
    }

    &--right {}
  }
</style>
