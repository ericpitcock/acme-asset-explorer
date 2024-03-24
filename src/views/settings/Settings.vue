<template>
  <div class="settings">
    <ep-header
      background-color="var(--interface-surface)"
      leftFlex="0 0 10rem"
      centerFlex="1"
      rightFlex="0 0 10rem"
      sticky
      stickyTop="0"
      padding="0 3rem"
      z-index="var(--z-index--fixed)"
    >
      <template #left>
        <ep-tabs
          :items="tabNames"
          :active-tab-index="activeTab"
          @tab-click="setActiveTab"
        />
      </template>
    </ep-header>
    <div class="settings__content">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserSettings',
    components: {
    },
    data() {
      return {
        activeTab: 0,
        tabItems: [
          {
            label: 'Service Config',
            path: '/settings/service-config'
          },
          {
            label: 'User Management',
            path: '/settings/users'
          },
          {
            label: 'Alerts',
            path: '/settings/alerts'
          },
          {
            label: 'Company Profile',
            path: '/settings/company-profile'
          },
          {
            label: 'Escalation Procedure',
            path: '/settings/escalation-procedure'
          },
          {
            label: 'API Access',
            path: '/settings/api-access'
          }
        ]
      }
    },
    computed: {
      tabNames() {
        return this.tabItems.map(item => item.label)
      }
    },
    methods: {
      setActiveTab(index) {
        this.activeTab = index
        this.$router.push(this.tabItems[index].path)
      }
    },
    mounted() {
      this.activeTab = this.tabItems.findIndex(item => item.path === this.$route.path)
    },
    watch: {
      $route(to) {
        // Update activeTab when route changes
        this.activeTab = this.tabItems.findIndex(item => item.path === to.path)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .settings {
    display: flex;
    flex-direction: column;
    background-color: var(--interface-surface);

    &__content {
      // display: flex;
      // background: red;
    }
  }
</style>