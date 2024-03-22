<template>
  <div class="service-details">
    {{ $route.params.serviceName }}
  </div>
</template>

<script>
  export default {
    name: 'ServiceDetails',
    created() {
      console.log('ServiceDetails component created!')
    },
  }
</script>

<style lang="scss" scoped>
  .service-details {
    padding: 3rem;
    padding-bottom: 20rem;
  }
</style>
