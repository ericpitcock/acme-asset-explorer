<template>
  <div class="app-header">
    <div class="app-controls app-controls--left">
      <ep-button
        variant="ghost"
        :iconLeft="{ name: 'menu' }"
        @click="this.$emit('menuButtonClicked')"
      />
      <ep-dropdown v-bind="userDropdownProps" />
    </div>
    <div class="app-controls app-controls--right">
      <ep-button
        variant="ghost"
        :iconLeft="themeIcon"
        @click="toggleTheme"
      />
      <ep-dropdown v-bind="helpDropdownProps" />
      <ep-button
        variant="ghost"
        :label="''"
        :iconRight="null"
        :iconLeft="{ name: 'notifications' }"
        :class="{ 'hasNotifications': hasActiveNotifications }"
        @click="this.$emit('notificationsButtonClicked')"
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'AcmeHeader',
    data() {
      return {
        userDropdownProps: {
          buttonProps: {
            variant: 'ghost',
            label: '',
            iconRight: null,
            iconLeft: { name: 'user' }
          },
          containerProps: {
            backgroundColor: 'var(--interface-overlay)',
            containerPadding: '1rem 0',
            borderRadius: 'var(--border-radius)',
            borderColor: 'var(--border-color--lighter)'
          },
          menuItems: [
            {
              label: 'User Profile',
              iconLeft: { name: 'user' },
              bind: {
                to: '/settings'
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
            },
          ]
        },
        helpDropdownProps: {
          alignRight: true,
          buttonProps: {
            variant: 'ghost',
            label: '',
            iconRight: null,
            iconLeft: { name: 'help' }
          },
          containerProps: {
            backgroundColor: 'var(--interface-overlay)',
            containerPadding: '1rem 0',
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
      }
    },
    components: {
    },
    methods: {
      ...mapActions(['toggleTheme']),
    },
    computed: {
      ...mapGetters(['hasActiveNotifications']),
      ...mapState(['theme']),
      themeIcon() {
        return this.theme == 'dark' ? { name: 'light-mode' } : { name: 'dark-mode' }
      }
    }
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
  }

  .hasNotifications {
    position: relative;

    &:after {
      position: absolute;
      top: 0.1rem;
      right: 0.25rem;
      content: '';
      background: green;
      width: 7px;
      height: 7px;
      border-radius: 5px;
    }
  }

  .app-controls {
    display: flex;
    align-items: center;

    &--left {}

    &--right {}
  }
</style>