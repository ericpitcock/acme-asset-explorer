<template>
  <div class="settings">
    <ep-header v-bind="headerProps">
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
            to: '/settings/users'
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
      ...mapState([
        'commonPageHeaderProps'
      ]),
      headerProps() {
        return {
          ...this.commonPageHeaderProps,
          // leftFlex: '0 0 10rem',
          // padding: '0 3rem'
        }
      },
      // tabNames() {
      //   return this.tabItems.map(item => item.label)
      // }
    },
    methods: {
      // setActiveTab(index) {
      //   this.activeTab = index
      //   // this.$router.push(this.tabItems[index].path)
      // }
    },
    mounted() {
      // this.activeTab = this.tabItems.findIndex(item => item.path === this.$route.path)
    },
    watch: {
      //   $route(to) {
      //     // Update activeTab when route changes
      //     this.activeTab = this.tabItems.findIndex(item => item.path === to.path)
      //   }
    },
  }
</script>

<style lang="scss" scoped>
  .settings {
    height: 100%;
    display: flex;
    flex-direction: column;

    // background-color: var(--interface-surface);
    // background-color: green;
    &__content {
      // display: flex;
      // background: red;
    }
  }
</style>