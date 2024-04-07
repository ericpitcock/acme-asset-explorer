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

<style lang="scss">
  .docs {
    --container-padding: 4rem;
    max-width: 80rem;

    &__intro {
      padding: var(--container-padding);
      background:
        radial-gradient(ellipse at 40% 0%,
          #bf398910 0,
          transparent 75%),
        radial-gradient(ellipse at 60% 0%,
          #096bde10 0,
          transparent 75%);
      border-bottom: 1px solid var(--border-color);

      h1 {
        font-size: var(--font-size--large);
        font-variation-settings: 'wght' 350;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        color: var(--text-color--primary);
      }

      .intro-feature {
        width: 40rem;
        padding: 3rem;
        background: var(--interface-surface--accent);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        border-left: 4px solid var(--primary-color-base);

        h2 {
          // margin-bottom: 1rem;
        }
      }
    }

    &__body {
      padding: var(--container-padding);
      padding-bottom: 6rem;

      h2 {
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        color: var(--text-color--primary);

        // margin-bottom: 1rem;
        &:not(:first-child) {
          margin-top: 3rem;
        }
      }

      ul {
        font-size: var(--font-size--body);
        list-style-type: disc;
        padding-left: 2.8rem;

        li {
          line-height: 2.4rem;

          ul {
            list-style-type: circle;
            margin-top: 1.4rem;
            padding-left: 2rem;
          }
        }

        li:not(:first-child) {
          margin-top: 0.8rem;
        }
      }
    }
  }
</style>