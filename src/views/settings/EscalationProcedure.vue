<template>
  <div class="escalation-procedure">
    <settings-module-layout>
      <template #sidebar>
        <h1>Escalation Procedure</h1>
        <p class="text--subtle">
          Specify the order in which contacts are notified of security incidents.
        </p>
      </template>
      <template #content>
        <ep-table
          :columns="columns"
          :data="escalationProcedures"
          width="100%"
          bordered
        />
        <ep-button
          variant="secondary"
          :icon-left="{ name: 'f/plus' }"
          @click="addEscalationProcedure"
        />
      </template>
    </settings-module-layout>
    <modal v-if="showModal">
      Modal content here
    </modal>
  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import SettingsModuleLayout from './SettingsModuleLayout.vue'
  import services from '../services/services.json'
  import { mapState } from 'vuex'

  export default {
    name: 'EscalationProcedure',
    components: {
      SettingsModuleLayout,
      Modal,
    },
    data() {
      return {
        columns: [
          { key: 'name', header: 'Name' },
          { key: 'services', header: 'Services' },
          { key: 'contacts', header: 'Contacts' },
          { key: 'instructions', header: 'Additional Instructions' }
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
            name: `Escalation Procedure ${i + 1}`,
            services: `${this.services[i].name}, ${this.services[i + 1].name}`,
            contacts: `${this.fakeUserData[i].name}, ${this.fakeUserData[i + 1].name}, ${this.fakeUserData[i + 2].name}`,
            instructions: ''
          })
        }

        return escalationProcedures
      }
    },
    methods: {
      addEscalationProcedure() {
        this.showModal = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .escalation-procedure {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 3rem;
  }
</style>