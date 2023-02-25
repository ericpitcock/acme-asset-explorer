<template>
  <div class="settings">
    <div class="settings__menu">
      <ep-menu
        :menuItems="menuItems"
        :containerProps="containerProps"
      />
    </div>
    <div class="settings__content">
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
          backgroundColor: 'var(--background-1)',
          borderWidth: '0',
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .settings {
    display: flex;
    height: 100%;

    .settings__menu {
      flex: 0 0 200px;
      border-right: 1px solid var(--border-color);
    }

    .settings__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 30px;
  }
}</style>