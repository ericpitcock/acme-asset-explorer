<template>
  <div class="company-profile">
    <!-- <ep-header padding="0 3rem">
      <template #right>
        <ep-button
          label="Save Changes"
          variant="primary"
          @click="handleSave"
        >
          Save
        </ep-button>
      </template>
    </ep-header> -->
    <div class="company-profile__approved-domains">
      <ep-container container-padding="0 3rem 3rem">
        <template #header>
          <ep-header>
            <template #left>
              <h1>Approved Domains <span v-if="changesUpdated">Changes
                  saved!</span></h1>
            </template>
            <!-- <template #right>
              <ep-button
                label="Save Changes"
                variant="primary"
                @click="handleSave"
              />
            </template> -->
          </ep-header>
        </template>
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
              @click="handleRemoveDomain(index)"
            />
          </div>
          <ep-button
            variant="secondary"
            :icon-left="{ name: 'f/plus' }"
            @click="handleAddDomain"
          />
        </ep-flex-container>
      </ep-container>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'CompanyProfile',
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
        // give focus to the last input
        this.$nextTick(() => {
          const inputs = document.querySelectorAll('.approved-domain-container input')
          inputs[inputs.length - 1].focus()
        })
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
          message: `Are you sure you want to remove the domain "${this.approvedDomains[index]}"?`, // eslint-disable-line no-template-curly-in-string
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
    padding: 3rem;
  }

  .approved-domain-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    align-self: stretch;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);

    // &:first-child {
    //   border-top: 1px solid var(--border-color);
    // }
    :deep(.ep-input-styler__container) {
      align-self: flex-start;
      flex: 0 0 40rem;
    }

    .ep-button {
      width: 4rem;
    }
  }
</style>