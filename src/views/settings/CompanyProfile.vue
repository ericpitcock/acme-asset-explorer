<template>
  <div class="company-profile">
    <div class="company-profile__sites">
      <ep-container container-padding="0 3rem 3rem">
        <template #header>
          <ep-header>
            <template #left>
              <h1>Sites</h1>
            </template>
            <template #right>
              <ep-button
                variant="secondary"
                :icon-left="{ name: 'f/plus' }"
                @click="handleAddSite"
              />
            </template>
          </ep-header>
        </template>
        <ep-flex-container
          align-items="flex-start"
          padding="2rem 0 0"
          gap="6rem"
        >
          <div
            v-for="{ name, address, phoneNumber } in sites"
            class="site"
          >
            <h2>{{ name }}</h2>
            <div class="address">
              <p
                v-for="line in address"
                :key="line"
              >
                {{ line }}
              </p>
            </div>
            <p>{{ phoneNumber }}</p>
          </div>
        </ep-flex-container>
      </ep-container>
    </div>
    <div class="company-profile__approved-domains">
      <ep-container container-padding="0 3rem 3rem">
        <template #header>
          <ep-header>
            <template #left>
              <h1>Approved Domains <span v-if="changesUpdated">Changes
                  saved!</span></h1>
            </template>
          </ep-header>
        </template>
        <ep-flex-container
          flex-flow="column nowrap"
          align-items="flex-start"
          padding="2rem 0 0"
        >
          <p class="text--subtle">
            Insight access is restricted to accounts registered under
            approved domains only.
          </p>
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
      ...mapState(['approvedDomains', 'sites']),
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

  .site {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .approved-domain-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    align-self: stretch;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);

    &:first-of-type {
      margin-top: 1rem;
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