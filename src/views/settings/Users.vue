<template>
  <div class="users">
    <ep-header padding="0 3rem">
      <template #left>
        <p class="text--subtle">{{ data.length }} Users</p>
      </template>
      <template #right>
        <ep-button
          variant="primary"
          label="Add User"
        />
      </template>
    </ep-header>
    <ep-table
      :columns="columns"
      :data="data"
      sticky-header
      sticky-top="0"
      striped
      bordered
      sortable
      width="100%"
      padding="0 1.6rem 10rem 1.6rem"
    />
  </div>
</template>

<script>
  import { faker } from '@faker-js/faker'

  export default {
    name: 'Users',
    data() {
      return {
        columns: [
          { header: 'Status', key: 'status' },
          { header: 'Name', key: 'name' },
          { header: 'Email', key: 'email' },
          { header: 'Role', key: 'role' },
          {
            header: 'Last Active',
            key: 'last_active',
            formatter: (value) => new Date(value).toLocaleString()
          },
        ],
        data: Array.from({ length: 10 }, () => ({
          status: faker.helpers.arrayElement(['Active', 'Inactive']),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          role: faker.helpers.arrayElement(['Admin', 'User']),
          last_active: faker.date.recent().toISOString(),
        }))
      }
    }
  }
</script>

<style scoped>
.users {
  /* width: 100%; */
}
</style>