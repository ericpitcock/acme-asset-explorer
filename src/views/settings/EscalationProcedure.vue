<template>
  <settings-module-layout>
    <template #sidebar>
      <h1>Escalation Procedure</h1>
      <p class="text--subtle">
        Specify the order in which contacts are notified of security incidents.
      </p>
    </template>
    <template #content>
      <ep-flex-container
        flex-flow="column nowrap"
        align-items="flex-start"
        gap="1rem"
      >
        <ep-table
          :columns="columns"
          :data="escalationProcedures"
          width="100%"
          bordered
          style="align-self: stretch"
        />
        <ep-button
          :icon-left="{ name: 'f-plus' }"
          @click="addEscalationProcedure"
        />
      </ep-flex-container>
    </template>
  </settings-module-layout>
</template>

<script>
  // import InModal from '@/components/InModal.vue'
  import SettingsModuleLayout from './SettingsModuleLayout.vue'
  import services from '../services/services.json'
  import { mapState } from 'vuex'

  export default {
    name: 'EscalationProcedure',
    components: {
      SettingsModuleLayout,
      // InModal,
    },
    data() {
      return {
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'services', label: 'Services' },
          { key: 'contacts', label: 'Contacts' },
          { key: 'instructions', label: 'Additional Instructions' }
        ],
        services,
        showModal: false
      }
    },
    computed: {
      ...mapState(['fakeUserData']),
      escalationProcedures() {
        const escalationProcedures = []

        for (let i = 0; i < 2; i++) {
          escalationProcedures.push({
            name: i === 0 ? 'Primary' : `Secondary`,
            services: `${this.services[i].name}, ${this.services[i + 1].name}`,
            contacts: `${this.fakeUserData[i].name.value}, ${this.fakeUserData[i + 1].name.value}, ${this.fakeUserData[i + 2].name.value}`,
            instructions: ''
          })
        }

        return escalationProcedures
      }
    },
    methods: {
      addEscalationProcedure() {
        // this.showModal = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .escalation-procedure {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }
</style>