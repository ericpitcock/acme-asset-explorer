<template>
  <div class="files">
    <ep-header v-bind="headerProps">
      <template #left>
        <h1 class="page-head">
          Files
        </h1>
      </template>
      <template #center>
        <!-- <ep-search
          v-bind="searchInputProps"
          :search-results="searchResults"
          results-label="name"
          results-value="name"
          @search="searchFiles"
        /> -->
      </template>
    </ep-header>
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

<script>
  import InSidebarLayout from '@/layouts/InSidebarLayout.vue'
  import { generatePastDate } from '../../utils/helpers'
  import { faker } from '@faker-js/faker'
  import { mapState } from 'vuex'
  import filenames from './filenames.js'
  import { formatDate } from '../../utils/helpers'

  export default {
    name: 'InFiles',
    components: {
      InSidebarLayout
    },
    data() {
      return {
        columns: [
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
        ],
        fileExtensions: ['.pdf', '.txt', '.zip', '.docx', '.xlsx'],
        searchInputProps: {
          inputProps: {
            clearable: true,
            placeholder: 'Search files...',
            size: 'large',
            width: '60rem',
            backgroundColor: 'var(--interface-foreground)',
          },
        },
        searchResults: []
      }
    },
    computed: {
      ...mapState('commonProps', {
        commonPageHeaderProps: state => state.commonPageHeaderProps,
      }),
      ...mapState([
        'fakeUserData'
      ]),
      fakeData() {
        const names = this.fakeUserData.map(user => user.name)

        // return only 6 names
        names.length = 6

        const data = []
        for (let i = 0; i < 34; i++) {
          const randomIndex = Math.floor(Math.random() * names.length)
          data.push({
            name: filenames[i],
            size: this.generateFileSize(),
            type: this.getFileType(filenames[i]),
            date_uploaded: generatePastDate(),
            uploaded_by: names[randomIndex]
          })
        }
        return data
      },
      headerProps() {
        return {
          ...this.commonPageHeaderProps,
          leftFlex: '0 0 20rem',
          centerJustify: 'flex-start',
          itemGap: '0',
        }
      },
    },
    mounted() {
      // this.searchResults = this.fakeData.map(file => file.name)
      // map file.name from this.fakeData to this.searchResults as an array of objects with name: file.name
      this.searchResults = this.fakeData.map(file => {
        return {
          name: file.name
        }
      })
    },
    methods: {
      getFileType(fileName) {
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
      },
      generateFileSize() {
        const size = faker.number.int({ min: 1, max: 10000000 })
        return size
      },
      searchFiles(query) {
        const results = this.fakeData.filter(file =>
          file.name.toLowerCase().includes(query.toLowerCase())
        )
        this.searchResults = results
      }
    }
  }
</script>

<style lang="scss" scoped>
  .files {}
</style>