<template>
  <div class="app-layout">
    <div class="left">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="grid">
        <div
          v-show="leftPanelOpen"
          class="left-panel"
        >
          <slot name="left-panel" />
        </div>
        <div class="content">
          <slot name="content" />
        </div>
      </div>
    </div>
    <div
      v-show="rightPanelOpen"
      class="right-panel"
    >
      <slot name="right-panel" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AcmeGrid',
    props: {
      leftPanelOpen: {
        type: Boolean,
        default: true
      },
      rightPanelOpen: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      gridClasses() {
        return {
          'left-panel-closed': !this.leftPanelOpen,
          'right-panel-closed': !this.rightPanelOpen
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-layout {
    width: 100vw;
    height: 100vh;
    display: flex;

    .left {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      overflow: auto;

      .header {
        flex: 0 0 41px;
      }

      .grid {
        flex: 1;
        display: flex;
        overflow-y: scroll;
        -ms-overflow-style: none; // Internet Explorer, Edge
        scrollbar-width: none; // Firefox

        &::-webkit-scrollbar {
          display: none; // Chrome, Safari, Opera
        }

        .left-panel {
          overflow: auto;
          -ms-overflow-style: none; // Internet Explorer, Edge
          scrollbar-width: none; // Firefox

          &::-webkit-scrollbar {
            display: none; // Chrome, Safari, Opera
          }

          z-index: var(--z-index--fixed);
        }

        .content {
          flex: 1;
          height: 100%;
          overflow: auto;
          -ms-overflow-style: none; // Internet Explorer, Edge
          scrollbar-width: none; // Firefox

          &::-webkit-scrollbar {
            display: none; // Chrome, Safari, Opera
          }
        }
      }
    }

    .right-panel {
      flex: 0 0 341px;
      overflow: auto;
      -ms-overflow-style: none; // Internet Explorer, Edge
      scrollbar-width: none; // Firefox

      &::-webkit-scrollbar {
        display: none; // Chrome, Safari, Opera
      }

      // border-left: 1px solid var(--border-color);
    }
  }
</style>