<template>
  <ep-container v-bind="containerProps">
    <template #header>
      <ep-header v-bind="headerProps">
        <template #left>
          <h1>{{ config.name }}</h1>
          <ep-badge
            :label="config.config_status.value"
            :styles="config.config_status.props.styles"
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
    <ep-flex-container gap="2rem">
      <div class="sidebar">
        <ep-menu
          :menu-items="sections"
          v-bind="menuProps"
        />
      </div>
      <ep-flex-container
        flex-flow="column nowrap"
        align-items="flex-start"
        gap="1rem"
        padding="0 0 10rem 0"
      >
        <template v-for="(inputs, section) in inputs">
          <ep-header v-bind="sectionHeaderProps">
            <template #left>
              <h2>{{ section }}</h2>
            </template>
          </ep-header>
          <template v-for="input in inputs">
            <ep-input
              v-bind="input"
              v-model="input.value"
              size="large"
            />
          </template>
        </template>
      </ep-flex-container>
    </ep-flex-container>
    <!-- <template #footer>
      <ep-footer />
    </template> -->
  </ep-container>
</template>

<script>
  export default {
    name: 'ConfigModal',
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    emits: ['close'],
    data() {
      return {
        containerProps: {
          backgroundColor: 'var(--interface-surface)',
          width: '70rem',
          height: '100%',
          // borderRadius: '0',
          // calculatedHeight: true,
          // calculateHeightOffset: 8.1,
          containerPadding: '0 3rem',
          // contentPadding: '0 3rem 0 0',
          overflow: 'auto',
          stickyHeader: true,
        },
        headerProps: {
          backgroundColor: 'var(--interface-surface)',
          height: '8.1rem',
          leftGap: '2rem',
          rightGap: '1rem',
          // padding: '0 3rem',
        },
        inputs: {
          'Network Information': [
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
          'IPMI Configuration': [
            {
              type: 'text',
              label: 'IPMI IP Address',
              value: this.config.ipmi_ip_address,
              required: true,
            },
            {
              type: 'text',
              label: 'IPMI Subnet Mask',
              value: this.config.ipmi_subnet_mask,
              required: true,
            },
            {
              type: 'text',
              label: 'IPMI Gateway',
              value: this.config.ipmi_gateway,
              required: true,
            },
          ],
          'Shipping Location': [
            {
              type: 'text',
              label: 'Address',
              value: this.config.shipping_address,
              required: true,
            },
            {
              type: 'text',
              label: 'City',
              value: this.config.shipping_city,
              required: true,
            },
            {
              type: 'text',
              label: 'State',
              value: this.config.shipping_state,
              required: true,
            },
            {
              type: 'text',
              label: 'Zip Code',
              value: this.config.shipping_zip,
              required: true,
            },
          ],
          'Sensor Location': [
            {
              type: 'text',
              label: 'Sensor Location',
              value: this.config.sensor_location,
              required: true,
            },
          ],
        },
        sections: [
          {
            label: 'Sensor Configuration',
          },
          {
            label: 'Authorized Users',
          },
          {
            label: 'Optional Modules',
          },
          {
            label: 'IP Addresses',
          },
          {
            label: 'Policy Detections',
          },
        ],
        sectionHeaderProps: {
          backgroundColor: 'var(--interface-surface)',
          sticky: true,
          stickyTop: '8.1rem',
        },
        menuProps: {
          containerProps: {
            borderWidth: '0',
          }
        }
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    position: sticky;
    top: 8.1rem;
    align-self: flex-start;
    padding: 2rem 0 0 0;
    margin-left: -2.4rem;
  }
</style>