<template>
  <div class="service-config">
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
  import services from '../../services/services.json'

  export default {
    name: 'ServiceConfig',
    components: {
      SidebarLayout
    },
    data() {
      return {
        containerProps: {
          backgroundColor: 'var(--interface-bg)',
          borderWidth: '0',
        },
        services
      }
    },
    computed: {
      menuItems() {
        const activeServices = this.services
          .filter(service => service.status === 'Active')
          .filter(service => service.configurable === true)
          .map(service => ({
            label: service.name,
            bind: {
              to: `/settings/service-config/${service.name.toLowerCase().replace(' ', '-')}`
            }
          }))

        activeServices.unshift({
          section: true,
          label: 'My Services'
        })

        return activeServices
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-config {
    display: flex;

    :deep(.ep-menu .ep-button--menu-item) {
      padding: 1rem 3rem !important;
    }

    :deep(.ep-menu .ep-button--menu-item.router-link-active) {
      color: var(--text--white);
      border-left: 3px solid var(--tab-active-border-color);
      text-indent: -3px;
    }

    :deep(.ep-menu .ep-menu__section) {
      padding-left: 3rem !important;
    }

    :deep(.ep-menu .ep-menu__section:not(:first-child)) {
      margin-top: 1rem !important;
    }

    &__nav {
      flex: 0 0 20rem;
      padding-top: 2rem;

      // hack button padding
      // need to address this in the component
      &:deep(.ep-menu__item button),
      &:deep(.ep-menu__section) {
        padding-left: 3rem !important;
      }
    }

    &__body {
      flex: 1 1 auto;
      overflow: auto;
    }
  }
</style>