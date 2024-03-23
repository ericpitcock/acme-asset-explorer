<template>
  <div class="files">
    <ep-header
      background-color="var(--interface-surface)"
      leftFlex="0 0 10rem"
      centerFlex="1"
      rightFlex="0 0 10rem"
      sticky
      stickyTop="0"
      padding="0 3rem"
      z-index="var(--z-index--fixed)"
    >
      <template #left>
        <p class="text--subtle">{{ fakeData.length }} Files</p>
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
      <template #right>
        <!-- <ep-button
          variant="ghost"
          :iconLeft="{ name: 'file' }"
          @click=""
        /> -->
      </template>
    </ep-header>
    <ep-table
      :columns="columns"
      :data="fakeData"
      sticky-header
      sticky-top="0"
      sortable
      sortKey="date_uploaded"
      striped
      bordered
      calculate-height
      header-background-color="var(--interface-surface)"
      padding="0 1.6rem 10rem 1.6rem"
      width="100%"
    />
  </div>
</template>

<script>
  import { faker } from '@faker-js/faker'

  export default {
    name: 'Files',
    data() {
      return {
        columns: [
          {
            header: 'Name',
            key: 'name',
            formatter: (value) => `<a href="#" download>${value}</a>`,
          },
          {
            header: 'Size',
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
            header: 'Type',
            key: 'type'
          },
          {
            header: 'Date Uploaded',
            key: 'date_uploaded',
            formatter: (value) => new Date(value).toLocaleString()
          },
          {
            header: 'Uploaded By',
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
      fakeData() {
        const names = []
        // Generate 9 random names
        for (let i = 0; i < 9; i++) {
          names.push(faker.person.fullName())
        }

        const data = []
        for (let i = 0; i < 34; i++) {
          const fileName = this.generateFileName()
          const randomIndex = Math.floor(Math.random() * names.length)
          data.push({
            name: fileName,
            size: this.generateFileSize(),
            type: this.getFileType(fileName),
            date_uploaded: faker.date.past().toISOString(),
            uploaded_by: names[randomIndex]
          })
        }
        return data
      },
      // searchResults() {
      //   return this.fakeData.map(file => {
      //     return {
      //       name: file.name
      //     }
      //   })
      // }
    },
    methods: {
      generateFileName() {
        const extension = this.fileExtensions[Math.floor(Math.random() * this.fileExtensions.length)]
        return faker.lorem.word() + extension // Using faker.lorem.word() for more realistic file names
      },
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
    },
    mounted() {
      // this.searchResults = this.fakeData.map(file => file.name)
      // map file.name from this.fakeData to this.searchResults as an array of objects with name: file.name
      this.searchResults = this.fakeData.map(file => {
        return {
          name: file.name
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .files {
    background-color: var(--interface-surface);
  }
</style>