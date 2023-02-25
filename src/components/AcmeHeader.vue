<template>
  <div class="app-header">
    <div class="app-controls app-controls--left">
      <ep-button
        kind="ghost"
        :iconLeft="{ name: 'menu' }"
        @click="this.$emit('menuButtonClicked')"
      />
      <ep-dropdown
        :button="{
          kind: 'ghost',
          label: '',
          iconRight: null,
          iconLeft: { name: 'user' }
        }"
        :containerProps="{
          backgroundColor: 'var(--background-4)',
          padding: '1rem 0',
          borderRadius: 'var(--border-radius)',
          borderColor: 'var(--border-color--lighter)'
        }"
        :menuItems="[{
          label: 'User Profile',
          iconLeft: { name: 'user' },
          bind: {
            to: '/settings'
          }
        },
        {
          label: 'Service Settings',
          iconLeft: { name: 'settings' },
          // bind: {
          //   to: '/service-settings'
          // }
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
        ]"
      >
      </ep-dropdown>
    </div>
    <div class="app-controls app-controls--right">
      <ep-button
        kind="ghost"
        :iconLeft="themeIcon"
        @click="toggleTheme"
      />
      <ep-dropdown
        :containerProps="{
          backgroundColor: 'var(--background-4)',
          padding: '1rem 0',
          borderRadius: 'var(--border-radius)',
          borderColor: 'var(--border-color--lighter)'
        }"
        :menuItems="[{
          label: 'Documentation',
          iconLeft: { name: 'help' }
        }, {
          label: 'Contact Support',
          iconLeft: { name: 'support' }
        }]"
        :button="{
          kind: 'ghost',
          label: '',
          iconRight: null,
          iconLeft: { name: 'help' }
        }"
        alignRight
      >
      </ep-dropdown>
      <ep-button
        kind="ghost"
        :label="''"
        :iconRight="null"
        :iconLeft="{ name: 'notifications' }"
        @click="this.$emit('notificationsButtonClicked')"
      />
    </div>
  </div>
</template>

<script>
  // import { mapState, mapActions } from 'vuex'

  export default {
    name: 'EpInsightAppHeader',
    components: {
    },
    methods: {
      // ...mapActions(['toggleTheme']),
    },
    computed: {
      // ...mapState(['theme']),
      themeIcon() {
        return this.theme == 'dark' ? { name: 'light-mode' } : { name: 'dark-mode' }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-header {
    // position: fixed;
    width: 100%;
    height: 41px;
    // grid-column: 1 / 3;
    // grid-row: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 6px;
    background: var(--app-header-background);
    border-bottom: 1px solid var(--border-color);
    z-index: var(--z-index--fixed);
  }

  .app-controls {
    display: flex;
    align-items: center;

    &--left {}

    &--right {}
  }
</style>