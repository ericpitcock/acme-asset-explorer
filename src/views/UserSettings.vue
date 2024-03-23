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
        <ep-tabs :items="tabNames" />
      </template>
    </ep-header>
    <div class="settings__content">
      <div class="content__nav">
        <ep-menu
          :menuItems="menuItems"
          :containerProps="containerProps"
        />
      </div>
      <div class="content__body">
        <p
          v-for="(n, index) of 60"
          :key="index"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et
          faucibus arcu condimentum sed.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat
          volutpat. Donec placerat nisl magna, et faucibus arcu condimentum
          sed.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna,
          et faucibus arcu condimentum sed.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat
          volutpat. Donec placerat nisl magna, et faucibus arcu condimentum
          sed.
        </p>
      </div>
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
        menuItems: [
          {
            label: 'General',
          },
          {
            label: 'Account',
          },
          {
            label: 'Notifications',
          },
          {
            label: 'Billing',
          },
          {
            label: 'Security',
          },
          {
            label: 'Integrations',
          }
        ],
        containerProps: {
          backgroundColor: 'var(--interface-surface)',
          borderWidth: '0',
        },
        tabItems: [
          {
            label: 'Services',
            path: '/settings/services'
          },
          {
            label: 'Users',
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
    }
  }
</script>

<style lang="scss" scoped>
  .settings {
    display: flex;
    flex-direction: column;
    background-color: var(--interface-surface);

    &__content {
      display: flex;
      gap: 3rem;

      .content__nav {
        position: sticky;
        top: 6.1rem;
        align-self: flex-start;
      }
    }
  }
</style>