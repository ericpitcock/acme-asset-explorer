<template>
  <div>
    <h1>Asset Details</h1>
    {{ selectedAsset }}
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'InAssetDetails',
    computed: {
      ...mapState(['selectedAsset']),
    },
  }
</script>