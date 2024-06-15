<template>
  <div class="vulnerabilities">
    <ep-header v-bind="commonPageHeaderProps">
      <template #left>
        <h1>
          <span>
            <router-link
              class="text--link"
              to="/"
            >Assets</router-link></span>
          <span>/</span>
          <span>{{ selectedAsset.hostname }}</span>
          <span style="color: var(--text-color--subtle);">
            ({{ selectedAsset.user.value }})
          </span>
        </h1>
      </template>
      <template #right>
        <ep-dropdown
          :context="selectedAsset"
          v-bind="exportDropdownProps"
          label="Export"
        />
      </template>
    </ep-header>
    <in-sidebar-layout sidebar-padding="2rem 0 0 0">
      <template #sidebar>
        <ep-menu
          :menu-items="menuItems"
          menu-type="nav"
          :container-props="menuContainerProps"
        />
      </template>
      <template #content>
        <!-- https://chatgpt.com/share/406ae90b-7032-4acd-81b2-781ec3d9adae -->
        <in-asset-details-module :selected-asset="selectedAsset" />
        <in-asset-vulnerabilities-module v-bind="commonContainerProps" />
        <in-asset-software-module v-bind="commonContainerProps" />
        <in-asset-security-posture-module v-bind="commonContainerProps" />
        <in-asset-network-info-module v-bind="commonContainerProps" />
        <in-asset-incident-history-module v-bind="commonContainerProps" />
        <in-asset-related-assets-module v-bind="commonContainerProps" />
      </template>
    </in-sidebar-layout>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import InAssetDetailsModule from './InAssetDetailsModule.vue'
  import InAssetVulnerabilitiesModule from './InAssetVulnerabilitiesModule.vue'
  import InAssetSoftwareModule from './InAssetSoftwareModule.vue'
  import InAssetSecurityPostureModule from './InAssetSecurityPostureModule.vue'
  import InAssetNetworkInfoModule from './InAssetNetworkInfoModule.vue'
  import InAssetIncidentHistoryModule from './InAssetIncidentHistoryModule.vue'
  import InAssetRelatedAssetsModule from './InAssetRelatedAssetsModule.vue'

  const store = useStore()
  const commonPageHeaderProps = store.state.commonProps.commonPageHeaderProps
  const commonContainerProps = computed(() => store.state.commonProps.commonContainerProps)
  const selectedAsset = computed(() => store.state.selectedAsset)

  const exportDropdownProps = {
    alignRight: true,
    buttonProps: {
      label: 'Export',
      // iconLeft: { name: 'f-download' }
    },
    menuItems: [
      {
        label: 'CSV',
        iconLeft: { name: 'f-file' }
      },
      {
        label: 'JSON',
        iconLeft: { name: 'f-file' }
      },
      // {
      //   divider: true
      // },
      // {
      //   label: 'PDF',
      //   iconLeft: { name: 'f-file' }
      // },
      // {
      //   label: 'JPG',
      //   iconLeft: { name: 'f-file' }
      // },
    ]
  }

  const menuContainerProps = {
    styles: {
      // '--ep-container-bg-color': 'transparent',
      // '--ep-container-border-width': '0',
    },
  }

  const menuItems = [
    {
      label: 'Asset Overview',
      bind: {
        href: '#asset-details',
      }
    },
    {
      label: 'Vulnerabilities',
    },
    {
      label: 'Installed Software',
    },
    {
      label: 'Security Posture',
    },
    {
      label: 'Network Information',
    },
    {
      label: 'Incident History',
    },
    {
      label: 'Related Assets',
    },
  ]
</script>

<style lang="scss" scoped>
  h1 {
    display: flex;
    gap: 1rem;
  }
</style>