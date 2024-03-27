<template>
  <div class="company-profile">
    <sites-module />
    <settings-module-layout :show-empty-state="approvedDomains.length === 0">
      <template #sidebar>
        <h1>Approved Domains </h1>
        <p class="text--subtle">
          Insight access is restricted to accounts registered under
          approved domains only.
        </p>
        <p v-if="changesUpdated">Changes saved!</p>
      </template>
      <template #content>
        <ep-flex-container
          flex-flow="column nowrap"
          align-items="flex-start"
        >
          <div
            v-for="(domain, index) in approvedDomains"
            class="approved-domain-container"
          >
            <ep-input
              v-model="approvedDomains[index]"
              size="large"
              placeholder="Enter a domain…"
              @input="handleInput"
              @blur="handleBlur"
            />
            <ep-button
              variant="ghost"
              :icon-left="{ name: 'f/trash-2' }"
              text-hover-color="red"
              @click="handleRemoveDomain(index)"
            />
          </div>
          <ep-button
            variant="secondary"
            :icon-left="{ name: 'f/plus' }"
            @click="handleAddDomain"
          />
        </ep-flex-container>
      </template>
    </settings-module-layout>
  </div>
</template>

<script>
  import SettingsModuleLayout from '@/views/settings/SettingsModuleLayout.vue'
  import SitesModule from './company-profile/SitesModule.vue'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'CompanyProfile',
    components: {
      SettingsModuleLayout,
      SitesModule,
    },
    data() {
      return {
        changesUpdated: false,
        isTyping: false,
      }
    },
    computed: {
      ...mapState(['approvedDomains']),
    },
    methods: {
      ...mapMutations(['addApprovedDomain', 'removeApprovedDomain']),
      handleAddDomain() {
        this.addApprovedDomain('')

        this.$nextTick(() => {
          const inputs = document.querySelectorAll('.approved-domain-container input')
          inputs[inputs.length - 1].focus()
        })
      },
      handleAddSite() {
        console.log('Add Site')
      },
      handleBlur() {
        this.changesUpdated = false
      },
      handleInput(value) {
        if (!this.isTyping) {
          this.isTyping = true
        }
        setTimeout(() => {
          this.isTyping = false
        }, 1000)
      },
      handleRemoveDomain(index) {
        // if the input is empty, remove the domain without warning
        if (!this.approvedDomains[index]) {
          this.removeApprovedDomain(index)
          return
        }

        // if the input is not empty, confirm the user wants to remove the domain
        this.$epDialog.open({
          title: 'Warning',
          message: `Are you sure you want to remove the domain "${this.approvedDomains[index]}"? All users registered under this domain will be disabled.`, // eslint-disable-line no-template-curly-in-string
          buttons: [
            { variant: 'secondary', text: 'Cancel', action: () => console.log('Cancel clicked') },
            { variant: 'danger', text: 'Remove Domain', action: () => this.removeApprovedDomain(index) }
          ]
        })
      },
      handleSave() {
        console.log('Save Changes')
      },
    },
    watch: {
      approvedDomains: {
        handler() {
          setTimeout(() => {
            this.changesUpdated = true
          }, 3000)

          setTimeout(() => {
            this.changesUpdated = false
          }, 5000)
        },
        deep: true
      }
    },
  }
</script>

<style lang="scss" scoped>
  .company-profile {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 3rem;
  }

  h2 {
    font-size: 1.5rem;
    // padding-bottom: 0.5rem;
    // border-bottom: 1px solid var(--border-color);
  }

  .approved-domain-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    align-self: stretch;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);

    &:first-of-type {
      border-top: 1px solid var(--border-color);
    }

    &:last-of-type {
      margin-bottom: 1rem;
    }

    :deep(.ep-input-styler__container) {
      align-self: flex-start;
      flex: 0 0 40rem;
    }

    .ep-button {
      width: 4rem;
    }
  }
</style>