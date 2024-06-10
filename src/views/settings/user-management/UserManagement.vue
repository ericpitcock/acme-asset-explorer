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
            <!-- flex-flow="column nowrap"
            gap="1.5rem"
            padding="1rem 0" -->
            <!-- <template
              v-for="(checkboxes, categoryName) in filters"
              :key="categoryName"
            >
              <h3 class="text-style--section">
                {{ categoryName }}
              </h3>
              <ep-checkbox
                v-for="checkbox in checkboxes"
                :key="checkbox.label"
                v-bind="checkbox"
                v-model="checkbox.checked"
              />
            </template> -->
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
            :data="fakeUserData"
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
          />
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
  import EpBadge from '../../../../node_modules/@ericpitcock/epicenter-vue-components/src/components/badge/EpBadge.vue'

  const store = useStore()
  // const approvedDomains = computed(() => store.state.approvedDomains)
  const { commonContainerProps } = store.state.commonProps
  const fakeUserData = computed(() => store.state.fakeUserData)

  const selectedUser = ref(null)
  const showModal = ref(false)
  const columns = [
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
  ]

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
