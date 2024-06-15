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
        <ep-menu :menu-items="sections" />
      </div>
      <ep-flex-container
        flex-flow="column nowrap"
        align-items="flex-start"
        gap="1rem"
        padding="0 0 10rem 0"
      >
        <template
          v-for="(inputGroup, section) in inputs"
          :key="section"
        >
          <ep-header v-bind="sectionHeaderProps">
            <template #left>
              <h2>{{ section }}</h2>
            </template>
          </ep-header>
          <template
            v-for="(input, index) in inputGroup"
            :key="index"
          >
            <ep-input
              v-bind="input"
              v-model="input.modelValue"
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
          styles: {
            '--ep-container-bg-color': 'var(--interface-surface)',
            '--ep-container-padding': '0 3rem',
            '--ep-container-border-width': '0.1rem',
            '--ep-container-overflow': 'auto',
            '--ep-container-width': '70rem',
            '--ep-container-height': '100%',
            '--ep-table-container-overflow': 'auto',
          },
          stickyHeader: true,
        },
        headerProps: {
          styles: {
            '--ep-header-container-bg-color': 'var(--interface-surface)',
            '--ep-header-height': '8.1rem',
            '--ep-header-left-gap': '2rem',
            '--ep-header-right-gap': '1rem',
          }
        },
        inputs: {
          'Network Information': [
            {
              type: 'text',
              label: 'Site Name',
              modelValue: this.config.name,
              required: true,
            },
            {
              type: 'text',
              label: 'Internal IP Address',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'Subnet Mask',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'Gateway',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'DNS Server',
              modelValue: '',
              required: true,
            },
          ],
          'IPMI Configuration': [
            {
              type: 'text',
              label: 'IPMI IP Address',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'IPMI Subnet Mask',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'IPMI Gateway',
              modelValue: '',
              required: true,
            },
          ],
          'Shipping Location': [
            {
              type: 'text',
              label: 'Address',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'City',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'State',
              modelValue: '',
              required: true,
            },
            {
              type: 'text',
              label: 'Zip Code',
              modelValue: '',
              required: true,
            },
          ],
          'Sensor Location': [
            {
              type: 'text',
              label: 'Sensor Location',
              modelValue: '',
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
          styles: {
            '--ep-header-container-bg-color': 'var(--interface-surface)',
            '--ep-header-container-position': 'sticky',
            '--ep-header-container-top': '6.1rem',
          }
        },
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