<template>
  <div class="company-profile">
    <sites-module />
    <ep-divider />
    <approved-domains-module />
    <ep-divider />
    <escalation-procedure />
    <ep-divider />
  </div>
</template>

<script>
  import ApprovedDomainsModule from './company-profile/ApprovedDomainsModule.vue'
  import EscalationProcedure from './EscalationProcedure.vue'
  import SitesModule from './company-profile/SitesModule.vue'

  export default {
    name: 'CompanyProfile',
    components: {
      ApprovedDomainsModule,
      EscalationProcedure,
      SitesModule,
    },
  }
</script>

<style lang="scss" scoped>
  .company-profile {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--interface-surface);
    padding: 2rem 3rem 20rem 3rem;
  }
</style>