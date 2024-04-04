<template>
  <div class="api-access">
    <sidebar-layout sidebar-padding="2rem 0 0 0">
      <template #sidebar>
        <ep-menu
          :menu-items="menuItems"
          menu-type="nav"
          :container-props="containerProps"
        />
      </template>
      <template #content>
        <router-view />
      </template>
    </sidebar-layout>
  </div>
</template>

<script>
  import SidebarLayout from '@/layouts/SidebarLayout.vue'

  export default {
    name: 'ApiAccess',
    components: {
      SidebarLayout
    },
    data() {
      return {
        containerProps: {
          backgroundColor: 'var(--interface-bg)',
          borderWidth: '0',
        },
        menuItems: [
          {
            label: 'API Access',
            section: true
          },
          {
            label: 'Configuration',
            bind: {
              to: '/settings/api-access/configuration'
            }
          },
          {
            label: 'Documentation',
            section: true
          },
          {
            label: 'Overview',
            bind: {
              to: '/settings/api-access/docs-overview'
            }
          },
          {
            label: 'Threat Intelligence',
            bind: {
              to: '/settings/api-access/docs-threat-intelligence'
            }
          },
          {
            label: 'Ticketing',
            bind: {
              to: '/settings/api-access/docs-ticketing'
            }
          },
          {
            label: 'Testing',
            bind: {
              to: '/settings/api-access/docs-testing'
            }
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .api-access {
    :deep(.ep-menu .ep-button--menu-item) {
      padding: 1rem 3rem !important;
    }

    :deep(.ep-menu .ep-menu__section) {
      padding-left: 3rem !important;
    }

    :deep(.ep-menu .ep-menu__section:not(:first-child)) {
      margin-top: 1rem !important;
    }
  }
</style>