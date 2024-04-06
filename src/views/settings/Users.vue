<template>
  <div class="users">
    <sidebar-layout sidebar-padding="2rem 0 0 3rem">
      <template #sidebar>
        <ep-flex-container
          flex-flow="column nowrap"
          align-items="flex-start"
          gap="3rem"
          padding="1rem 0"
        >
          <ep-button
            variant="primary"
            label="New User"
            @click="addUser"
          />

          <ep-flex-container
            flex-flow="column nowrap"
            gap="1.5rem"
            padding="1rem 0"
          >
            <template
              v-for="(filterSet, category) in filters"
              :key="category"
            >
              <h3 class="text-style--section">
                {{ category }}
              </h3>
              <ep-checkbox
                v-for="checkbox in filterSet"
                :key="checkbox.label"
                v-bind="checkbox"
                v-model="checkbox.checked"
              />
            </template>
          </ep-flex-container>
        </ep-flex-container>
      </template>
      <template #content>
        <ep-container
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
        >
          <ep-empty-state
            v-if="filteredData.length === 0"
            message="No users found"
            subtext="Try adjusting your filters"
            style="margin-bottom: 1.5rem;"
          />
          <ep-table
            v-else
            v-show="!loading"
            :columns="columns"
            :data="filteredData"
            sticky-header
            sticky-top="61"
            striped
            bordered
            sortable
            width="100%"
            style="width: 100%; overflow: unset;"
          />
        </ep-container>
      </template>
    </sidebar-layout>
    <modal v-if="showModal">
      <add-user @close="showModal = false" />
    </modal>
  </div>
</template>

<script>
  import { ref, computed, onMounted, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import AddUser from './AddUser.vue'
  import Modal from '@/components/Modal.vue'
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import useFilters from '@/composables/useFilters.js'

  export default {
    name: 'Users',
    components: {
      AddUser,
      Modal,
      SidebarLayout,
    },
    setup() {
      const instance = getCurrentInstance()
      const $epDialog = instance.appContext.config.globalProperties.$epDialog

      const loading = ref(true)

      const store = useStore()
      const approvedDomains = computed(() => store.state.approvedDomains)
      const commonContainerProps = computed(() => store.state.commonContainerProps)
      const fakeUserData = computed(() => store.state.fakeUserData)

      const columns = [
        {
          header: 'Status',
          key: 'status',
          cellType: 'component',
          component: 'ep-badge',
        },
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Role', key: 'role' },
        {
          header: 'Last Active',
          key: 'last_active',
          formatter: (value) => new Date(value).toLocaleString()
        },
      ]

      const { filters, generateFilters, filteredData } = useFilters(columns, fakeUserData)

      const showModal = ref(false)

      const addUser = () => {
        if (approvedDomains.value.length) {
          showModal.value = true
        } else {
          $epDialog.open({
            title: 'No Approved Domains',
            message: 'You need to add an approved domain to your company profile before you can add a new user.',
            buttons: [
              { variant: 'secondary', text: 'Cancel' },
              {
                variant: 'primary',
                text: 'Add Domain',
                action: () => $router.push('/settings/company-profile')
              },
            ]
          })
        }
      }

      onMounted(() => {
        const columnsToFilter = ['status', 'role']
        const disabledFilters = ['Deactivated']

        generateFilters(columnsToFilter, disabledFilters)

        setTimeout(() => {
          loading.value = false
        }, 100)
      })

      return {
        columns,
        filters,
        loading,
        showModal,
        addUser,
        approvedDomains,
        commonContainerProps,
        fakeUserData,
        filteredData
      }
    }
  }
</script>

<style lang="scss" scoped>
  .users {
    .text-style--section:not(:first-child) {
      margin-top: 1rem;
    }

    :deep(.ep-table-container) {
      // overflow: revert;
      overflow-x: auto;
    }
  }
</style>
