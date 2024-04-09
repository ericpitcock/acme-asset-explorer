<template>
  <ep-container v-bind="containerProps">
    <template #header>
      <ep-header v-bind="headerProps">
        <template #left>
          <h1>{{ config.name }}</h1>
          <ep-badge
            :label="config.config_status.value"
            :variant="config.config_status.props.variant"
            outlined
          />
        </template>
        <template #right>
          <ep-button
            label="Cancel"
            variant="secondary"
            @click="close"
          />
          <ep-button
            label="Save and Close"
            variant="primary"
            @click="close"
          >
            Close
          </ep-button>
        </template>
      </ep-header>
    </template>
    <ep-flex-container gap="3rem">
      <div class="sidebar">
        <ep-menu :menu-items="sections" />
      </div>
      <ep-flex-container
        flex-flow="column nowrap"
        align-items="flex-start"
        gap="1rem"
      >
        <!-- {{ config }} -->
        <ep-header>
          <template #left>
            <h2>Network Information</h2>
          </template>
        </ep-header>
        <template v-for="input in inputs">
          <ep-input
            v-bind="input"
            size="xlarge"
            v-model="input.value"
          />
        </template>
      </ep-flex-container>
    </ep-flex-container>
    <template #footer>
      <ep-footer />
    </template>
  </ep-container>
</template>

<script>
  export default {
    name: 'ConfigModal',
    emits: ['close'],
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        containerProps: {
          width: '100rem',
          height: '100%',
          borderRadius: '0',
          overflow: 'scroll',
          containerPadding: '0 3rem',
          contentPadding: '0 0 0 0',
        },
        headerProps: {
          height: '8.1rem',
          leftGap: '2rem',
          rightGap: '1rem',
        },
        inputs: [
          {
            type: 'text',
            label: 'Site Name',
            value: this.config.name,
            required: true,
          },
          {
            type: 'text',
            label: 'Internal IP Address',
            value: this.config.internal_ip_address,
            required: true,
          },
          {
            type: 'text',
            label: 'Subnet Mask',
            value: this.config.subnet_mask,
            required: true,
          },
          {
            type: 'text',
            label: 'Gateway',
            value: this.config.gateway,
            required: true,
          },
          {
            type: 'text',
            label: 'DNS Server',
            value: this.config.dns_server,
            required: true,
          },
        ],
        sections: [
          {
            label: 'Sensor Configuration',
          },
          {
            label: 'Maintenance Windows',
          },
          {
            label: 'Authorized Users',
          },
          {
            label: 'Alert Lists',
          },
          {
            label: 'Escalation Procedure',
          },
          {
            label: 'Optional Modules',
          },
          {
            label: 'Response Protocol',
          },
          {
            label: 'IP Addresses',
          },
          {
            label: 'Policy Detections',
          },
        ]
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>