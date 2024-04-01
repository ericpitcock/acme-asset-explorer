<template>
  <div class="services">
    <ep-header v-bind="headerProps">
      <template #left>
        <p>Services</p>
      </template>
      <template #right>
        <ep-dropdown
          v-bind="dropdownProps"
          :menu-items="getInactiveServices"
          alignRight
        />
      </template>
    </ep-header>
    <ep-flex-container
      flex-flow="column nowrap"
      gap="2rem"
      padding="2rem 3rem 20rem 3rem"
    >
      <ep-banner
        v-if="getExpiredServices"
        :message="`Expired services: ${getExpiredServices.join(', ')}`"
        subtext="Please renew them as soon as possible"
        banner-style="error"
        :icon-props="{ name: 'f/alert-triangle' }"
      />
      <div
        v-for="category in categories"
        class="services__category"
      >
        <ep-container v-bind="containerProps">
          <template #header>
            <ep-header background-color="transparent">
              <template #left>
                <p>{{ category }}</p>
              </template>
            </ep-header>
          </template>
          <div class="services__services">
            <template
              v-for="service in getServicesByCategory(category)"
              :key="service.id"
            >
              <router-link
                :to="{ name: 'service-details', params: { serviceName: serviceSlug(service.name) } }"
              >
                <div class="services__service">
                  <div class="service-icon">
                    <ep-icon v-bind="service.iconProps" />
                  </div>
                  <div class="service-name">
                    <h3>{{ service.name }}</h3>
                  </div>
                  <div class="service-badge">
                    <ep-badge
                      :label="service.status"
                      :variant="getVariant(service.status)"
                    />
                  </div>
                </div>
              </router-link>
            </template>
          </div>
        </ep-container>
      </div>
    </ep-flex-container>
  </div>
</template>

<script>
  import services from './services.json'

  export default {
    name: 'ServiceInfo',
    data() {
      return {
        services,
        containerProps: {
          containerPadding: '0 3rem 3rem',
          contentPadding: '1rem 0 0 0',
        },
        dropdownProps: {
          buttonProps: {
            label: 'Add Service',
            variant: 'secondary',
          },
          containerProps: {
            backgroundColor: 'var(--interface-overlay)',
            containerPadding: '1rem 0',
            borderRadius: 'var(--border-radius)',
            borderColor: 'var(--border-color--lighter)'
          }
        },
        headerProps: {
          backgroundColor: 'var(--interface-surface)',
          leftFlex: '0 0 20rem',
          // leftPadding: '0 3rem',
          centerFlex: '1',
          // centerPadding: '0 3rem 0 0',
          sticky: true,
          stickyTop: '0',
          itemGap: '0',
          padding: '0 3rem',
          zIndex: 'var(--z-index--fixed)',
        },
      }
    },
    computed: {
      categories() {
        return [...new Set(this.services.map(service => service.category))]
      },
      // hasExpiredServices() {
      //   return this.services.some(service => service.status === 'Expired')
      // },
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
        const inactiveServices = this.services.filter(service => service.status === 'Inactive')

        return inactiveServices.map(service => {
          if (service.status === 'Inactive') {
            return {
              label: service.name,
            }
          }
          return { divider: true }
        })
      },
    },
    methods: {
      getServicesByCategory(category) {
        // return this.services.filter(service => service.category === category)
        // return services by category and filter out those with service.status === 'Inactive'
        return this.services.filter(service => service.category === category && service.status !== 'Inactive')
      },
      // getInactiveServicesByCategory(category) {
      //   const inactiveServices = this.services.filter(service => service.category === category && service.status === 'Inactive')

      //   return inactiveServices.map(service => {
      //     if (service.status === 'Inactive') {
      //       return {
      //         label: service.name,
      //       }
      //     }
      //     return { divider: true }
      //   })
      // },
      getVariant(label) {
        switch (label) {
          case 'Active':
            return 'success'
          case 'Inactive':
            return 'secondary'
          case 'Expired':
            return 'danger'
          default:
            return 'primary'
        }
      },
      hasInactiveServices(category) {
        return this.services.some(service => service.category === category && service.status === 'Inactive')
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

    // gap: 3rem;
    // padding: 3rem;
    // padding-bottom: 20rem;
    // hack banner into submission
    // fix this in the component
    &:deep(.ep-banner__body) {
      justify-content: flex-start;
    }

    .services__category {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      // h2 {
      //   // margin-bottom: 1rem;
      //   font-size: var(--font-size--large);
      //   font-variation-settings: 'wght' 300;
      // }
      .services__services {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 1rem;
      }

      .services__service {
        display: flex;
        flex-direction: column;
        // align-items: center;
        // justify-content: space-around;
        // gap: 1rem;
        // height: 15rem;
        padding: 2rem 2.5rem 3rem 2.5rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        background-color: var(--interface-foreground);
        text-align: center;

        &:hover {
          background-color: var(--interface-surface--hover);
          cursor: pointer;
        }

        .service-icon {
          flex: 0 0 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          // background-color: red;
        }

        .service-name {
          flex: 0 0 4rem;
          font-size: var(--font-size--body);
          // background-color: blue;
        }

        .service-badge {
          flex: 0 0 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          margin-top: 1rem;
          // background-color: green;
        }
      }
    }
  }
</style>
