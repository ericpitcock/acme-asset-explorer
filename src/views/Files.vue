<template>
  <div class="files">
    <ep-header
      background-color="var(--interface-foreground)"
      leftFlex="0 0 10rem"
      centerFlex="1"
      rightFlex="0 0 10rem"
      sticky
      stickyTop="0"
      padding="0 3rem"
      z-index="var(--z-index--fixed)"
    >
      <template #left>
        <!-- <h2>{{ fakeData.length }} Files</h2> -->
        <p class="text--subtle">{{ fakeData.length }} Files</p>
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
      header-background-color="var(--interface-foreground)"
      padding="0 1.6rem 10rem 1.6rem"
      width="100%"
    />
  </div>
</template>

<script>
  import faker from 'faker'

  export default {
    name: 'Files',
    data() {
      return {
        columns: [
          {
            header: 'Name',
            key: 'name'
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
          }
        ],
        fileExtensions: ['.pdf', '.txt', '.zip', '.docx', '.xlsx'] // Add more if needed
      }
    },
    computed: {
      fakeData() {
        const data = []
        for (let i = 0; i < 34; i++) {
          const fileName = this.generateFileName()
          data.push({
            name: fileName,
            size: this.generateFileSize(),
            type: this.getFileType(fileName),
            date_uploaded: faker.date.past().toISOString()
          })
        }
        return data
      }
    },
    methods: {
      generateFileName() {
        const extension = this.fileExtensions[Math.floor(Math.random() * this.fileExtensions.length)]
        return faker.random.word() + extension // Using faker.random.word() for more realistic file names
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
        const size = faker.random.number({ min: 1, max: 10000000 })
        return size
      }
    }
  }
</script>

<style lang="scss" scoped>
  .files {
    // padding-bottom: 20rem;
  }
</style>