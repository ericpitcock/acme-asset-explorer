<template>
  <div class="service-config">
    <div class="service-config__nav">
      <ep-menu
        :menu-items="menuItems"
        :container-props="containerProps"
      />
    </div>
    <div class="service-config__body">

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
        return this.services
          .filter(service => service.status === 'Active')
          .filter(service => service.configurable === true)
          .map(service => ({ label: service.name }))
      }
    }
  }
</script>