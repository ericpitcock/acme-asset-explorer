<template>
  <div class="settings">
    <ep-header v-bind="commonPageHeaderProps">
      <template #left>
        <ep-tabs :items="tabItems" />
      </template>
    </ep-header>
    <div class="settings__content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'UserSettings',
    components: {
    },
    data() {
      return {
        tabItems: [
          {
            label: 'Service Config',
            to: '/settings/service-config'
          },
          {
            label: 'User Management',
            to: '/settings/user-management'
          },
          {
            label: 'Notifications',
            to: '/settings/notifications'
          },
          {
            label: 'Company Profile',
            to: '/settings/company-profile'
          },
          {
            label: 'Escalation Procedure',
            to: '/settings/escalation-procedure'
          },
          {
            label: 'API Access',
            to: '/settings/api-access'
          }
        ]
      }
    },
    computed: {
      ...mapState('commonProps', {
        commonPageHeaderProps: state => state.commonPageHeaderProps,
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .settings {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__content {}
  }
</style>