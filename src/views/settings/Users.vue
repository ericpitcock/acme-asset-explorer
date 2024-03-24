<template>
  <div class="users">
    <ep-header
      leftFlex="0 0 10rem"
      centerFlex="1"
      centerJustify="flex-start"
      rightFlex="0 0 10rem"
      padding="0 3rem"
    >
      <template #left>
        <p class="text--subtle">{{ filteredData.length }} Users</p>
      </template>
      <template #center>
        <ep-checkbox
          label="Show Deactivated Users"
          v-model="showInactive"
        />
      </template>
      <template #right>
        <ep-button
          variant="primary"
          label="Add User"
        />
      </template>
    </ep-header>
    <ep-table
      v-show="!loading"
      :columns="columns"
      :data="filteredData"
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
  // import { faker } from '@faker-js/faker'
  import { mapState } from 'vuex'

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
        // data: Array.from({ length: 10 }, () => ({
        //   status: faker.helpers.arrayElement(['Active', 'Deactivated']),
        //   name: faker.person.fullName(),
        //   email: faker.internet.email(),
        //   role: faker.helpers.arrayElement(['Admin', 'Partner Admin', 'User']),
        //   last_active: faker.date.recent().toISOString(),
        // })),
        loading: true,
        showInactive: false
      }
    },
    computed: {
      ...mapState(['fakeUserData']),
      filteredData() {
        return this.fakeUserData.filter(user => {
          if (this.showInactive) return true
          return user.status === 'Active'
        })
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
</script>

<style scoped>
.users {
  /* width: 100%; */
}
</style>