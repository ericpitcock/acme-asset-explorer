<template>
  <div :class="['nav-container', { 'nav-container--collapsed': collapsed }]">
    <nav class="main-nav">
      <div class="main-nav__item main-nav__item--logo">
        <acme-logo :type="logoType" />
      </div>
      <template
        v-for="(navItem, index) in navItems"
        :key="index"
      >
        <router-link
          :to="navItem.path"
          class="main-nav__item"
        >
          <ep-icon :name="navItem.icon" />
          <div class="main-nav__item__name">{{ navItem.name }}</div>
        </router-link>
        <div
          v-if="index === 2"
          class="main-nav__item__divider"
          :key="`divider${index}`"
        ></div>
      </template>
    </nav>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import AcmeLogo from '@/components/AcmeLogo.vue'

  export default {
    name: 'AcmeMainNav',
    components: {
      AcmeLogo
    },
    props: {
      collapsed: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        navItems: [
          {
            name: 'Dashboard',
            icon: 'dashboard',
            path: '/'
          },
          {
            name: 'Assets',
            icon: 'display',
            path: '/assets'
          },
          {
            name: 'Vulnerabilities',
            icon: 'target',
            path: '/vulnerabilities'
          },
          {
            name: 'Service Info',
            icon: 'info',
            path: '/service-info'
          },
          {
            name: 'Reports',
            icon: 'report',
            path: '/reports'
          },
          {
            name: 'Files',
            icon: 'file',
            path: '/files'
          }
        ]
      }
    },
    computed: {
      ...mapState(['sidebar']),
      logoType() {
        return this.collapsed ? 'icon' : 'full'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav-container {
    // grid-column: 1 / 1;
    // grid-row: 2 / 2;
    padding: 30px 20px;
    background: var(--background-1);

    &--collapsed {
      padding-left: 0;
      padding-right: 0;
    }

    @media (max-width: 1024px) {
      // display: none;
    }
  }

  .main-nav {
    // position: fixed;
    width: 200px;
    display: flex;
    flex-direction: column;

    .nav-container--collapsed & {
      width: 50px;
      align-items: center;
    }

    &__item {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 30px;
      border: 1px solid transparent;
      border-radius: 3px;
      text-decoration: none;
      user-select: none;

      & + & {
        margin-top: 2px;
      }

      &--logo {
        margin-bottom: 30px;

        &:hover {
          background: transparent !important;
        }
      }

      .nav-container--collapsed & {
        justify-content: center;
        width: 40px;
        padding: 0;

        &:hover .main-nav__item__name {
          display: block;
          position: absolute;
          left: 42px;
          padding: 4px 10px;
          border-radius: 3px;
          background: var(--background-4);
          border: 1px solid var(--border-color--lighter);
          font-size: var(--font-size--small);
          color: var(--text-color) !important;
          white-space: nowrap;
        }
      }

      &:not(.router-link-exact-active):not(.main-nav__item--logo):hover {
        background: var(--nav-link-hover-bg-color);
        cursor: pointer;
      }

      &.router-link-exact-active {
        background-image: var(--nav-link-active-bg-color);

        .main-nav__item__name {
          color: var(--nav-link-active-text-color) !important;
        }

        .ep-icon {
          color: var(--nav-link-active-icon-color) !important;
        }
      }

      &__divider {
        align-self: center;
        width: 160px;
        margin: 30px 0;
        border-bottom: 1px solid var(--border-color);

        .nav-container--collapsed & {
          width: 30px;
        }
      }

      .ep-icon {
        color: var(--nav-link-icon-color);
      }

      &__name {
        margin-left: 13px;
        font-weight: 600;
        color: var(--text-color);

        .nav-container--collapsed & {
          display: none;
        }
      }
    }
  }
</style>