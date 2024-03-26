<template>
  <table class="font-size--small">
    <thead>
      <tr>
        <th>Permission</th>
        <th
          v-for="role in roles"
          :key="role"
          :class="{ 'selected': role === selectedRole }"
        >
          {{ role }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="permission in permissions"
        :key="permission.name"
      >
        <td>{{ permission.name }}</td>
        <td :class="[
          'checkmark',
          { 'checkmark--selected': permission.user && selectedRole === 'User' }
        ]">
          {{ permission.user ? '✔' : '' }}
        </td>
        <td :class="[
          'checkmark',
          { 'checkmark--selected': permission.partner && selectedRole === 'Partner' }
        ]">
          {{ permission.partner ? '✔' : '' }}
        </td>
        <td :class="[
          'checkmark',
          { 'checkmark--selected': permission.admin && selectedRole === 'Admin' }
        ]">
          {{ permission.admin ? '✔' : '' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'RolesTable',
    props: {
      selectedRole: String,
    },
    data() {
      return {
        roles: [
          'User',
          'Partner',
          'Admin',
        ],
        permissions: [
          {
            name: 'Create reports',
            user: true,
            partner: true,
            admin: true,
          },
          {
            name: 'Configure services',
            user: false,
            partner: false,
            admin: true,
          },
          {
            name: 'Configure users',
            user: false,
            partner: false,
            admin: true,
          },
          {
            name: 'Edit company profile',
            user: false,
            partner: false,
            admin: true,
          },
          {
            name: 'Configure alerts',
            user: false,
            partner: false,
            admin: true,
          },
          {
            name: 'Configure escalation procedures',
            user: false,
            partner: false,
            admin: true,
          },
          {
            name: 'Configure API access',
            user: false,
            partner: true,
            admin: true,
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  table {
    width: fit-content;
    border-collapse: collapse;
  }

  th,
  td {
    border-bottom: 1px solid var(--border-color);
    padding: 8px;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
  }

  th:not(:first-child),
  .checkmark {
    text-align: center;

    &.checkmark--selected {
      color: var(--text-color--link);
    }
  }

  th.selected {
    color: var(--text-color--link);
  }
</style>
