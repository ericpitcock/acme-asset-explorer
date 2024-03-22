<template>
  <div class="service-info">
    <ep-banner
      v-if="getExpiredServices"
      :message="`Expired services: ${getExpiredServices.join(', ')}`"
      subtext="Please renew them as soon as possible"
      banner-style="error"
      :icon-props="{ name: 'f/alert-triangle' }"
    />
    <div
      v-for="category in categories"
      class="service-info__category"
    >
      <ep-header background-color="transparent">
        <template #left>
          <h2>{{ category }}</h2>
        </template>
        <template #right>
          <ep-dropdown
            v-if="hasInactiveServices(category)"
            v-bind="dropdownProps"
            :menu-items="getInactiveServicesByCategory(category)"
            alignRight
          />
        </template>
      </ep-header>
      <div class="service-info__services">
        <template
          v-for="service in getServicesByCategory(category)"
          :key="service.id"
        >
          <router-link
            :to="{ name: 'service-details', params: { serviceName: service.name.toLowerCase().replace(' ', '-') } }"
          >
            <div class="service-info__service">
              <div class="service-icon">
                <ep-icon v-bind="service.iconProps" />
              </div>
              <div class="service-name">
                <h3>{{ service.name }}</h3>
              </div>
              <div class="service-badge">
                <ep-badge
                  :label="service.badge"
                  :variant="getVariant(service.badge)"
                />
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import services from './services.json'

  export default {
    name: 'ServiceInfo',
    data() {
      return {
        services,
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
        }
      }
    },
    computed: {
      categories() {
        return [...new Set(this.services.map(service => service.category))]
      },
      // hasExpiredServices() {
      //   return this.services.some(service => service.badge === 'Expired')
      // },
      getExpiredServices() {
        // if none of the services are expired, return false
        if (!this.services.some(service => service.badge === 'Expired')) {
          return false
        }
        // return an array of expired services
        const expiredServices = this.services.filter(service => service.badge === 'Expired')
        // map the expired services to return only the name
        return expiredServices.map(service => service.name)
      },
    },
    methods: {
      getServicesByCategory(category) {
        // return this.services.filter(service => service.category === category)
        // return services by category and filter out those with service.badge === 'Add Service'
        return this.services.filter(service => service.category === category && service.badge !== 'Add Service')
      },
      getInactiveServicesByCategory(category) {
        const inactiveServices = this.services.filter(service => service.category === category && service.badge === 'Add Service')

        return inactiveServices.map(service => {
          if (service.badge === 'Add Service') {
            return {
              label: service.name,
            }
          }
          return { divider: true }
        })
      },
      getVariant(label) {
        switch (label) {
          case 'Active':
            return 'success'
          case 'Add Service':
            return 'secondary'
          case 'Expired':
            return 'danger'
          default:
            return 'primary'
        }
      },
      hasInactiveServices(category) {
        return this.services.some(service => service.category === category && service.badge === 'Add Service')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .service-info {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 3rem;
    padding-bottom: 20rem;

    // hack banner into submission
    // fix this in the component
    &:deep(.ep-banner__body) {
      justify-content: flex-start;
    }

    .service-info__category {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h2 {
        // margin-bottom: 1rem;
        font-size: var(--font-size--large);
      }

      .service-info__services {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      }

      .service-info__service {
        display: flex;
        flex-direction: column;
        // align-items: center;
        // justify-content: space-around;
        gap: 1rem;
        // height: 15rem;
        padding: 2rem 2.5rem 3rem 2.5rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        background-color: var(--interface-surface);
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
          // background-color: green;
        }
      }
    }
  }
</style>
