<template>
  <div class="services">
    <ep-header v-bind="headerProps">
      <template #left>
        <h1 class="page-head">
          Services
        </h1>
      </template>
      <template #right>
        <ep-dropdown v-bind="dropdownProps" />
      </template>
    </ep-header>
    <div class="services__content">
      <template
        v-for="(category, index) in categories"
        :key="index"
      >
        <settings-module-layout>
          <template #sidebar>
            <h1>{{ category }}</h1>
            <p class="text--subtle">
              24/7 managed threat detection and
              response capabilities services
            </p>
          </template>
          <template #content>
            <template
              v-for="service in getServicesByCategory(category)"
              :key="service.id"
            >
              <div class="service">
                <div class="service__badge">
                  <ep-badge
                    :label="service.status"
                    :styles="getbadgeStyles(service.status)"
                  />
                </div>
                <div class="service__icon">
                  <ep-icon v-bind="service.iconProps" />
                </div>
                <div class="service__name">
                  <h3>{{ service.name }}</h3>
                </div>
                <div class="service__actions">
                  <ep-button
                    v-if="isConfigurable(service)"
                    :icon-left="{ name: 'settings' }"
                    variant="ghost"
                    :disabled="service.status === 'Unsubscribed'"
                    :to="{ path: `/settings/service-config/${serviceSlug(service.name)}` }"
                  />
                </div>
              </div>
            </template>
          </template>
        </settings-module-layout>
      </template>
    </div>
  </div>
</template>

<script>
  import SettingsModuleLayout from '../settings/SettingsModuleLayout.vue'
  import services from './services.json'
  import { mapState } from 'vuex'

  export default {
    name: 'ServiceInfo',
    components: { SettingsModuleLayout },
    data() {
      return {
        services,
      }
    },
    computed: {
      ...mapState('commonProps', {
        commonPageHeaderProps: state => state.commonPageHeaderProps,
      }),
      categories() {
        return [...new Set(this.services.map(service => service.category))]
      },
      dropdownProps() {
        return {
          alignRight: true,
          buttonProps: {
            label: 'Add Service',
            variant: 'primary',
          },
          containerProps: {
            backgroundColor: 'var(--interface-overlay)',
            borderRadius: 'var(--border-radius)',
            borderColor: 'var(--border-color--lighter)'
          },
          menuItems: this.getInactiveServices,
        }
      },
      getExpiredServices() {
        // if none of the services are expired, return false
        if (!this.services.some(service => service.status === 'Expired')) {
          return false
        }
        // return an array of expired services
        const expiredServices = this.services.filter(service => service.status === 'Expired')
        // map the expired services to return only the name
        return expiredServices.map(service => service.name)
      },
      getInactiveServices() {
        const inactiveServices = this.services.filter(service => service.status === 'Unsubscribed')

        return inactiveServices.map(service => {
          if (service.status === 'Unsubscribed') {
            return {
              label: service.name,
            }
          }
          return { divider: true }
        })
      },
      headerProps() {
        return {
          ...this.commonPageHeaderProps,
          backgroundColor: 'var(--page-header-background)',
        }
      },
    },
    methods: {
      getServicesByCategory(category) {
        const subscribed = this.services.filter(service => service.category === category && service.status !== 'Unsubscribed')
        const unsubscribed = this.services.filter(service => service.category === category && service.status === 'Unsubscribed')
        return [...subscribed, ...unsubscribed]
      },
      getbadgeStyles(status) {
        return {
          '--ep-badge-bg-color': 'transparent',
          '--ep-badge-border-color': status === 'Subscribed' ? 'green' : status === 'Unsubscribed' ? 'var(--border-color)' : 'red',
        }
      },
      hasInactiveServices(category) {
        return this.services.some(service => service.category === category && service.status === 'Inactive')
      },
      isConfigurable(service) {
        return service.configurable
      },
      serviceSlug(serviceName) {
        // return serviceName as lowercase with spaces and special characters replaced with hyphens
        return serviceName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .services {
    display: flex;
    flex-direction: column;

    &__content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 120rem;
      padding: 2rem 3rem 20rem 3rem;
    }

    .service {
      display: flex;
      align-items: center;
      height: 6rem;
      border-top: 1px solid var(--border-color);

      &:last-child {
        border-bottom: 1px solid var(--border-color);
      }

      &__badge {
        flex: 0 0 10rem;
        order: 2;
      }

      &__icon {
        flex: 0 0 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        order: 0;
      }

      &__name {
        flex: 1;
        order: 1;
      }

      &__actions {
        flex: 0 0 10rem;
        display: flex;
        justify-content: flex-end;
        order: 3;
      }
    }
  }
</style>
