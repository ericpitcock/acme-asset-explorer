<template>
  <ep-container
    v-bind="commonContainerProps"
    container-padding="1rem 3rem 3rem"
  >
    <ep-flex-container
      flex-flow="column wrap"
      gap="1rem"
      align-items="flex-start"
    >
      <ep-table
        :columns="columns"
        :data="data"
        v-bind="apiConfigTableProps"
      />
      <ep-button
        label="Add New"
        variant="secondary"
        :icon-left="{ name: 'f/plus' }"
        @click="addApiConfig"
      />
    </ep-flex-container>
  </ep-container>
</template>

<script>
  import { faker } from '@faker-js/faker'
  import { mapState } from 'vuex'
  import { generateFutureDate, generateRecentDate, generatePastDate } from '../../../utils/helpers'

  export default {
    name: 'ApiAccessConfiguration',
    data() {
      return {
        apiConfigTableProps: {
          bordered: true,
          exclude: ['api_key'],
          selectable: true,
          sortable: true,
          stickyHeader: true,
          stickyTop: '61',
          style: 'width: 100%; overflow: unset;',
          width: '100%',
        },
        columns: [
          {
            header: 'Status',
            key: 'status',
            cellType: 'component',
            component: 'ep-badge',
          },
          {
            header: 'Nickname',
            key: 'nickname',
          },
          {
            header: 'Endpoint',
            key: 'endpoint',
          },
          {
            header: 'Auth Type',
            key: 'auth_type',
          },
          {
            header: 'API Key',
            key: 'api_key',
          },
          {
            header: 'Created',
            key: 'created',
          },
          {
            header: 'Expires',
            key: 'expires',
          },
        ],
        data: [
          {
            status: {
              label: 'Active',
              props: {
                label: 'Active',
                variant: 'success',
                outlined: true,
              },
            },
            nickname: 'Tickets',
            endpoint: 'Ticketing API',
            auth_type: 'OAuth',
            api_key: 'AbCdEfGhIjKlMnOpQrStUvWxYz123456',
            created: generatePastDate(),
            expires: generateFutureDate(),
          },
          {
            status: {
              label: 'Active',
              props: {
                label: 'Active',
                variant: 'success',
                outlined: true,
              },
            },
            nickname: 'Threat Intel New',
            endpoint: 'Threat Intelligence API',
            auth_type: 'Token',
            api_key: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
            created: generatePastDate(),
            expires: generateFutureDate(),
          },
          {
            status: {
              label: 'Expired',
              props: {
                label: 'Expired',
                variant: 'danger',
                outlined: true,
              },
            },
            nickname: 'Threat Intel',
            endpoint: 'Threat Intelligence API',
            auth_type: 'Token',
            api_key: 'qwertyuiopasdfghjklzxcvbnm123456',
            created: generatePastDate(),
            expires: generateRecentDate({ days: 10 }),
          },
        ],
      }
    },
    computed: {
      ...mapState('commonProps', {
        commonContainerProps: state => state.commonContainerProps,
      }),
    },
    methods: {
      addApiConfig() {
        console.log('Add API Config')
      },
    },
  }
</script>

<style lang="scss" scoped></style>
