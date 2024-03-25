<template>
  <table class="font-size--small">
    <thead>
      <tr>
        <th>Permission</th>
        <th>User</th>
        <th>Partner</th>
        <th>Admin</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Create reports</td>
        <td class="checkmark">&#10003;</td>
        <td class="checkmark">&#10003;</td>
        <td class="checkmark">&#10003;</td>
      </tr>
      <tr>
        <td>Configure services</td>
        <td></td>
        <td></td>
        <td class="checkmark">&#10003;</td>
      </tr>
      <tr>
        <td>Configure users</td>
        <td></td>
        <td></td>
        <td class="checkmark">&#10003;</td>
      </tr>
      <tr>
        <td>Edit company profile</td>
        <td></td>
        <td></td>
        <td class="checkmark">&#10003;</td>
      </tr>
      <tr>
        <td>Configure alerts</td>
        <td></td>
        <td></td>
        <td class="checkmark">&#10003;</td>
      </tr>
      <tr>
        <td>Configure escalation procedures</td>
        <td></td>
        <td></td>
        <td class="checkmark">&#10003;</td>
      </tr>
      <tr>
        <td>Configure API access</td>
        <td></td>
        <td class="checkmark">&#10003;</td>
        <td class="checkmark">&#10003;</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'PermissionsTable'
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
  }
</style>
