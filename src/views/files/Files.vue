<template>
  <div class="files">
    <!-- <ep-header v-bind="headerProps">
      <template #left>
        <h1 class="page-head">
          Files
        </h1>
      </template>
<template #center>
        <ep-search
          v-bind="searchInputProps"
          :search-results="searchResults"
          results-label="name"
          results-value="name"
          @search="searchFiles"
        />
      </template>
</ep-header> -->
    <div class="files__features">
      <div
        v-for="file in featuredFiles"
        :key="file.name"
        class="featured__file"
      >
        <div class="featured__file-name">
          {{ file.name }}
        </div>
        <div class="featured__file-size">
          {{ file.size }}
        </div>
        <div class="featured__file-date">
          {{ file.date_uploaded }}
        </div>
        <div class="featured__file-uploader">
          {{ file.uploaded_by }}
        </div>
      </div>
    </div>
    <in-sidebar-layout sidebar-padding="3rem 0 0 3rem">
      <template #sidebar>
        <ep-flex-container
          flex-flow="column nowrap"
          align-items="flex-start"
          gap="2rem"
        >
          <p>{{ fakeData.length }} Files</p>
          <ep-button
            label="Upload File"
            variant="primary"
            :icon-left="{
              name: 'f-upload',
              styles: {
                '--ep-icon-width': '2.4rem',
              }
            }"
          />
        </ep-flex-container>
      </template>
      <template #content>
        <ep-container :styles="{
          '--ep-container-bg-color': 'var(--interface-surface)',
          '--ep-container-content-padding': '1rem 3rem 3rem',
        }">
          <ep-table
            :columns="columns"
            :data="fakeData"
            sticky-header
            striped
            bordered
            :styles="{
              '--ep-table-width': '100%',
              '--ep-table-header-bg-color': 'var(--interface-surface)',
              '--ep-table-sticky-top': '61px',
              '--ep-table-container-overflow': 'unset',
            }"
          />
        </ep-container>
      </template>
    </in-sidebar-layout>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import { generatePastDate } from '../../utils/helpers'
  import { faker } from '@faker-js/faker'
  import { useStore } from 'vuex'
  import filenames from './filenames.js'
  import { formatDate } from '../../utils/helpers'

  defineOptions({
    name: 'InFiles',
  })

  // featured files array with 3 files, showing file name, size, date uploaded, and uploaded by
  const featuredFiles = [
    {
      name: 'File 1.pdf',
      size: '1.2 MB',
      date_uploaded: '2021-09-01',
      uploaded_by: 'John Doe'
    },
    {
      name: 'File 2.docx',
      size: '3.4 MB',
      date_uploaded: '2021-09-02',
      uploaded_by: 'Jane Doe'
    },
    {
      name: 'File 3.txt',
      size: '0.5 MB',
      date_uploaded: '2021-09-03',
      uploaded_by: 'John Doe'
    }
  ]

  const columns = [
    {
      label: 'Name',
      key: 'name',
      // formatter that wraps the line no matter how long the text is
      formatter: (value) => `<div class="text--overflow-hidden">${value}</div>`,
    },
    {
      label: 'Size',
      key: 'size',
      style: 'tabular-numbers',
      formatter: (value) => {
        if (value === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(value) / Math.log(k))
        return parseFloat((value / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
      }
    },
    {
      label: 'Type',
      key: 'type'
    },
    {
      label: 'Date Uploaded',
      key: 'date_uploaded',
      formatter: (value) => formatDate(value)
    },
    {
      label: 'Uploaded By',
      key: 'uploaded_by',
    }
  ]

  const fileExtensions = ['.pdf', '.txt', '.zip', '.docx', '.xlsx']
  const searchInputProps = {
    inputProps: {
      clearable: true,
      placeholder: 'Search files...',
      size: 'large',
      width: '60rem',
      backgroundColor: 'var(--interface-foreground)',
    },
  }
  const searchResults = ref([])

  const store = useStore()
  // ...mapState('commonProps', {
  //   commonPageHeaderProps: state => state.commonPageHeaderProps,
  // }),
  // ...mapState([
  //   'fakeUserData'
  // ]),
  const commonPageHeaderProps = store.state.commonProps.commonPageHeaderProps
  const fakeUserData = computed(() => store.state.fakeUserData)

  const fakeData = computed(() => {
    const names = fakeUserData.value.map(user => user.name)

    // return only 6 names
    names.length = 6

    const data = []
    for (let i = 0; i < 34; i++) {
      const randomIndex = Math.floor(Math.random() * names.length)
      data.push({
        name: filenames[i],
        size: generateFileSize(),
        type: getFileType(filenames[i]),
        date_uploaded: generatePastDate(),
        uploaded_by: names[randomIndex]
      })
    }
    return data
  })

  const headerProps = computed(() => {
    return {
      ...commonPageHeaderProps,
      leftFlex: '0 0 20rem',
      centerJustify: 'flex-start',
      itemGap: '0',
    }
  })

  onMounted(() => {
    // this.searchResults = this.fakeData.map(file => file.name)
    // map file.name from this.fakeData to this.searchResults as an array of objects with name: file.name
    searchResults.value = fakeData.value.map(file => {
      return {
        name: file.name
      }
    })
  })

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop()
    switch (extension) {
      case 'pdf':
        return 'PDF'
      case 'txt':
        return 'Text'
      case 'zip':
        return 'ZIP'
      case 'docx':
        return 'Microsoft Word'
      case 'xlsx':
        return 'Excel'
      case 'csv':
        return 'CSV'
      default:
        return 'Unknown'
    }
  }

  const generateFileSize = () => {
    const size = faker.number.int({ min: 1, max: 10000000 })
    return size
  }

  const searchFiles = (query) => {
    const results = fakeData.value.filter(file =>
      file.name.toLowerCase().includes(query.toLowerCase())
    )
    searchResults.value = results
  }
</script>

<style lang="scss" scoped>
  .files {}
</style>