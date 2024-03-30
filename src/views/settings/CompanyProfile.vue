<template>
  <div class="company-profile">
    <sites-module />
    <approved-domains-module />
  </div>
</template>

<script>
  import ApprovedDomainsModule from './company-profile/ApprovedDomainsModule.vue'
  import SitesModule from './company-profile/SitesModule.vue'

  export default {
    name: 'CompanyProfile',
    components: {
      ApprovedDomainsModule,
      SitesModule,
    },
  }
</script>

<style lang="scss" scoped>
  .company-profile {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }
</style>