<template>
  <div class="users">
    <in-sidebar-layout sidebar-padding="2rem 0 0 3rem">
      <template #sidebar>
        <ep-flex flex-props=",,column,,,flex-start,,3rem,1rem 0">
          <!-- flex-flow="column nowrap"
          align-items="flex-start"
          gap="3rem"
          padding="1rem 0" -->
          <ep-button
            variant="primary"
            label="New User"
            @click="addUser"
          />
          <!-- width,
          height,
          flexDirection,
          flexWrap,
          justifyContent,
          alignItems,
          alignContent,
          gap,
          padding -->
          <ep-flex flex-props=",column,,,,,,1.5rem,1rem 0">
            <ep-table-checkbox-filters
              :filters="filters"
              @update:filters="onFilterChange"
            />
          </ep-flex>
        </ep-flex>
      </template>
      <template #content>
        <ep-container v-bind="containerProps">
          <ep-empty-state
            v-if="fakeUserData.length === 0"
            style="padding-top: 2rem;"
          >
            <p>No users found</p>
            <template #subtext>
              <p>
                Try
                <span
                  class="text--link"
                  @click="resetFilters"
                >
                  reseting your filters
                </span>
              </p>
            </template>
          </ep-empty-state>
          <ep-table
            v-else
            :columns="columns"
            :data="filteredData"
            :hidden-columns="[
              'id',
              'status',
              'office_phone',
              'user_mobile_phone'
            ]"
            :styles="{
              '--ep-table-width': '100%',
              '--ep-table-container-overflow': 'unset',
              '--ep-table-sticky-top': '0',
            }"
            sticky-header
            striped
            selectable
            bordered
            @row-click="editUser"
          >
            <template #header="{ column, cellWidths }">
              <ep-table-sortable-header
                :column="column"
                :sort-column="sortColumn"
                :sort-order="sortOrder"
                @sort="sortBy"
              />
            </template>
          </ep-table>
        </ep-container>
      </template>
    </in-sidebar-layout>
    <in-modal
      v-if="showModal"
      padding="6rem 0 0 0"
    >
      <AddUser
        :user="selectedUser"
        @close="handleClose"
      />
    </in-modal>
  </div>
</template>

<script setup>
  import { ref, computed, markRaw, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import AddUser from './AddUser.vue'
  import InModal from '@/components/InModal.vue'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import InUserStatus from '../../../components/InUserStatus.vue'
  import EpBadge from '@epicenter/components/badge/EpBadge.vue'
  import {
    useExclude,
    useColumnFilters,
    useDataFilters,
    useSorting,
    usePagination,
    useSearch
  } from '@epicenter/composables/index.js'

  const store = useStore()
  // const approvedDomains = computed(() => store.state.approvedDomains)
  const { commonContainerProps } = store.state.commonProps

  const columns = ref([
    {
      label: 'ID',
      key: 'id',
      sortable: false,
      filterable: false,
    },
    {
      label: 'Role',
      key: 'role',
      component: markRaw(EpBadge),
      sortable: true,
      filterable: true,
    },
    {
      label: 'Status',
      key: 'status',
      sortable: true,
      filterable: true,
    },
    {
      label: 'Name',
      key: 'name',
      component: markRaw(InUserStatus),
      sortable: true,
      filterable: true,
    },
    {
      label: 'Email',
      key: 'email',
      sortable: true,
      filterable: true,
    },
    {
      label: 'Mobile Phone',
      key: 'user_mobile_phone',
      sortable: false,
      filterable: false,
    },
    {
      label: 'Office Phone',
      key: 'office_phone',
      sortable: false,
      filterable: false,
    },
    {
      label: 'Last Active',
      key: 'last_active',
      formatter: (value) => new Date(value).toLocaleString(),
      sortable: true,
      filterable: true,
    },
  ])

  const fakeUserData = computed(() => store.state.fakeUserData)

  // use exclude
  // const {
  //   includedColumns,
  //   includedData
  // } = useExclude(columnsRef, tableData, [])

  // use sorting
  const {
    sortedData,
    sortBy,
    sortColumn,
    sortOrder
  } = useSorting(fakeUserData, 'role', 'desc')

  onMounted(() => {
    const columnsToFilter = ['role', 'status']
    const disabledFilters = ['Deactivated']
    // const customSortOrder = { severity: ['Critical', 'High', 'Medium', 'Low'] }

    generateFilters(columnsToFilter, disabledFilters)
  })

  const {
    filters,
    generateFilters,
    filteredData,
    onFilterChange
  } = useDataFilters(columns, sortedData)

  // // use column filters
  // const {
  //   columnFilters,
  //   visibleColumns,
  //   visibleData,
  //   handleFilter
  // } = useColumnFilters(includedColumns, [], filteredData)

  // // use search
  // const {
  //   searchedData,
  //   searchText,
  //   updateSearchText
  // } = useSearch(visibleData)

  // // use pagination
  // const {
  //   paginatedData,
  //   currentPage,
  //   totalPages,
  //   onPageChange
  // } = usePagination(searchedData, 1, 30)

  const selectedUser = ref(null)
  const showModal = ref(false)

  const containerProps = {
    styles: {
      ...commonContainerProps.styles,
      '--ep-container-max-width': '120rem',
      '--ep-container-padding': '1rem 3rem 3rem',
      '--ep-container-border-width': '0',
      '--ep-container-border-radius': '0',
      '--ep-container-overflow': 'unset',
    }
  }

  const addUser = () => {
    showModal.value = true
  }

  const editUser = (user) => {
    selectedUser.value = user
    showModal.value = true
  }

  const handleClose = () => {
    selectedUser.value = null
    showModal.value = false
  }

  const resetFilters = () => {
    // within every key in filters, set checked to true
    Object.keys(filters.value).forEach((key) => {
      filters.value[key].forEach((filter) => {
        filter.checked = true
      })
    })
  }

  onMounted(() => {
  })


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

    // :deep(.ep-table tr td span) {
    //   pointer-events: none;
    // }
  }
</style>
