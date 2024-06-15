<template>
  <ep-container
    id="asset-details"
    v-bind="containerProps"
  >
    <!-- <pre style="all: revert;">{{ selectedAsset }}</pre>
    <br /> -->
    <p>ID: {{ selectedAsset.id }}</p>
    <p>Status: {{ selectedAsset.status }}</p>
    <p>Risk Score: {{ selectedAsset.risk_score.value }}</p>
    <p>User: {{ selectedAsset.user.value }}</p>
    <p>Hostname: {{ selectedAsset.hostname }}</p>
    <p>IP Address: {{ selectedAsset.ip_address }}</p>
    <p>IP Address v6: {{ selectedAsset.ipv6_address }}</p>
    <p>MAC Address: {{ selectedAsset.mac_address }}</p>
    <p>Location: {{ selectedAsset.location }}</p>
    <p>Operating System: {{ selectedAsset.operating_system }}
      {{ selectedAsset.os_version }}</p>
    <p>Last Seen: {{ selectedAsset.last_seen }}</p>
  </ep-container>
</template>

<script setup>
  defineOptions({
    name: 'InAssetDetailsModule',
  })

  const props = defineProps({
    selectedAsset: {
      type: Object,
      required: true
    }
  })

  const containerProps = {
    styles: {
      '--ep-container-bg-color': 'var(--page-header-background)',
      '--ep-container-padding': '3rem',
      // '--ep-container-border-width': '0',
    }
  }
</script>