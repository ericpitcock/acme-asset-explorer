<template>
  <div class="service-config">
    <div class="service-config__nav">
      <ep-menu
        :menu-items="menuItems"
        menu-type="nav"
        :container-props="containerProps"
      />
    </div>
    <div class="service-config__body">
      <ep-container height="300px">
      </ep-container>
    </div>
  </div>
</template>

<script>
  import services from '../services/services.json'

  export default {
    name: 'ServiceConfig',
    data() {
      return {
        containerProps: {
          backgroundColor: 'var(--interface-surface)',
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
          .map(service => ({ label: service.name }))

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