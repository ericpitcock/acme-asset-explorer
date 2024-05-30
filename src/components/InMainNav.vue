<template>
  <div :class="['nav-container', { 'nav-container--collapsed': isCollapsed }]">
    <nav class="main-nav">
      <div class="main-nav__item main-nav__item--logo">
        <router-link to="/">
          <in-logo :type="logoType" />
        </router-link>
      </div>
      <template
        v-for="(navItem, index) in navItems"
        :key="index"
      >
        <router-link
          :to="navItem.path"
          class="main-nav__item"
        >
          <ep-icon
            :name="navItem.icon"
            :styles="{ '--ep-icon-width': '2rem' }"
          />
          <div class="main-nav__item__name">
            {{ navItem.name }}
          </div>
        </router-link>
        <div
          v-if="index === 1"
          :key="`divider${index}`"
          class="main-nav__item__divider"
        />
      </template>
    </nav>
    <div class="credits">
      <p>
        © 2024 εSentiɾe, Inc.<br>
        Waterloo, ON<br>
        1-888-231-8392
      </p>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import InLogo from '@/components/InLogo.vue'

  export default {
    name: 'AcmeMainNav',
    components: {
      InLogo
    },
    data() {
      return {
        navItems: [
          {
            name: 'Assets',
            icon: 'display',
            path: '/'
          },
          {
            name: 'Vulnerabilities',
            icon: 'target',
            path: '/vulnerabilities'
          },
          {
            name: 'Services',
            icon: 'info',
            path: '/services'
          },
          {
            name: 'Files',
            icon: 'file',
            path: '/files'
          },
          {
            name: 'Settings',
            icon: 'settings',
            path: '/settings'
          }
        ]
      }
    },
    computed: {
      ...mapState(['leftPanelCollapsed', 'leftPanelCollapsedUser']),
      logoType() {
        return this.isCollapsed ? 'icon' : 'full'
      },
      isCollapsed() {
        return this.leftPanelCollapsed || this.leftPanelCollapsedUser
      }
    },
    mounted() {
      this.checkViewportWidth()
      window.addEventListener('resize', this.checkViewportWidth)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkViewportWidth)
    },
    methods: {
      ...mapMutations(['setLeftPanel']),
      checkViewportWidth() {
        if (this.leftPanelCollapsedUser) return

        const viewportWidth = window.innerWidth
        if (viewportWidth <= 1500 && !this.leftPanelCollapsed) {
          this.setLeftPanel(true)
        } else if (viewportWidth > 1500 && this.leftPanelCollapsed) {
          this.setLeftPanel(false)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nav-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    padding: 30px 20px;
    background: var(--interface-surface);

    &--collapsed {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .main-nav {
    width: 200px;
    height: 100%;
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
      color: var(--text-color--loud);

      & + & {
        margin-top: 2px;
      }

      &--logo {
        color: var(--logo-color);
        margin-bottom: 30px;

        &:hover {
          background: transparent !important;
        }
      }

      &:last-child {
        margin-top: auto;
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
          background: var(--interface-overlay);
          border: 1px solid var(--border-color--lighter);
          font-size: var(--font-size--small);
          color: var(--text-color--loud) !important;
          white-space: nowrap;
        }
      }

      &:not(.router-link-active):not(.main-nav__item--logo):hover {
        background: var(--nav-link-hover-bg-color);
        cursor: pointer;
      }

      &.router-link-active {
        background-image: var(--nav-link-active-bg-color);
        cursor: default;

        .main-nav__item__name {
          color: var(--nav-link-active-text-color) !important;
        }

        .ep-icon {
          --ep-icon-color: var(--nav-link-active-icon-color) !important;
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
        --ep-icon-color: var(--nav-link-icon-color);
      }

      &__name {
        margin-left: 13px;
        font-weight: 600;
        color: var(--text-color--loud);

        .nav-container--collapsed & {
          display: none;
        }
      }
    }
  }

  .credits {
    padding: 2rem 3rem 0;
    border-top: 1px solid var(--border-color);
    user-select: none;

    .nav-container--collapsed & {
      display: none;
    }

    p {
      font-size: var(--font-size--xsmall);
      line-height: var(--text-line-height--tight);
      color: var(--text-color--subtle);
    }
  }
</style>