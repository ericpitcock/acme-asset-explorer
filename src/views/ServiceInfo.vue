<template>
  <div class="service-info">
    <div
      v-for="category in categories"
      class="service-info__category"
    >
      <h2>{{ category }}</h2>
      <div class="service-info__services">
        <div
          v-for="service in getServicesByCategory(category)"
          :key="service.id"
          class="service-info__service"
        >
          <h3>{{ service.name }}</h3>
          <ep-badge
            :label="service.badge"
            :variant="getVariant(service.badge)"
          />
        </div>
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
        services
      }
    },
    computed: {
      categories() {
        return [...new Set(this.services.map(service => service.category))]
      },
    },
    methods: {
      getServicesByCategory(category) {
        return this.services.filter(service => service.category === category)
      },
      getVariant(label) {
        switch (label) {
          case 'Subscribed':
            return 'success'
          case 'Learn More':
            return 'primary'
          case 'Trending':
            return 'success'
          default:
            return 'default'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-info {
    display: flex;
    flex-direction: column;
    gap: 6rem;
    padding: 3rem;

    .service-info__category {
      h2 {
        margin-bottom: 1rem;
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
        align-items: center;
        gap: 1rem;
        padding: 3rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        background-color: var(--interface-surface);
        text-align: center;

        h3 {
          flex: 1;
        }
      }
    }
  }
</style>
