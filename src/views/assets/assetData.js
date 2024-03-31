import { faker } from '@faker-js/faker'
import { markRaw } from 'vue'
import EpSparkBar from '../../../node_modules/@ericpitcock/epicenter-vue-components/src/components/spark-bar/EpSparkBar.vue'

const assetColumns = [
  {
    header: 'ID',
    key: 'id'
  },
  {
    header: 'Status',
    key: 'status',
    formatter: (value, row) => {
      return `<div class="status-dot status-dot--${value.toLowerCase()}">${value}</div>`
    }
  },
  {
    header: 'User',
    key: 'user'
  },
  {
    header: 'IP Address',
    key: 'ip_address',
    style: 'tabular-numbers'
  },
  {
    header: 'Vulnerabilities',
    key: 'vulnerabilities',
    cellType: 'component',
    component: markRaw(EpSparkBar),
  },
  {
    header: 'Location',
    key: 'location'
  },
  {
    header: 'Operating System',
    key: 'operating_system'
  },
  {
    header: 'Last Seen',
    key: 'last_seen',
    formatter: (value) => new Date(value).toLocaleString()
  },
  {
    header: 'IPv6 Address',
    key: 'ipv6_address',
    style: 'tabular-numbers'
  },
  {
    header: 'MAC Address',
    key: 'mac_address',
    style: 'tabular-numbers'
  }
]

// create array with four random numbers [0, 0, 0, 0]
const vulnArray = () => {
  let arr = []
  for (let i = 0; i < 4; i++) {
    arr.push(faker.number.int({ min: 0, max: 100 }))
  }
  return arr
}

// add the sum to the end of the array [0, 0, 0, 0, sum] — combine these two functions
const vulnArraySum = () => {
  let arr = vulnArray()
  let sum = arr.reduce((a, b) => a + b, 0)  // sum of array
  arr.push(sum)
  return arr
}

// this function creates an array of objects with random data, placeholder for vulnerabilities
const fakeArray = length => {
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push({
      id: faker.string.uuid(),
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'Archived']),
      user: `${faker.person.firstName()}.${faker.person.lastName()}@acme.io`,
      ip_address: faker.internet.ipv4(),
      vulnerabilities: {
        bar: []
      },
      location: faker.helpers.arrayElement([
        'New York City',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'Seattle',
        'Austin',
        'Jacksonville',
        'San Francisco',
        'Indianapolis'
      ]),
      operating_system: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux']),
      last_seen: faker.date.recent({ days: 10 }).toISOString(),
      ipv6_address: faker.internet.ipv6(),
      mac_address: faker.internet.mac()
    })
  }
  return arr
}

// create array of vulnerability objects
const fakeVulnArray = length => {
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push({
      vulnerabilities: vulnArraySum()
    })
  }
  return arr
}

const fakeData = fakeVulnArray(100)

// find the index of the array with the highest sum of vulnerabilities, which is the last element in the vulnerabilities property
const maxVulnIndex = fakeData.reduce((iMax, x, i, arr) => x.vulnerabilities[4] > arr[iMax].vulnerabilities[4] ? i : iMax, 0)

// append 'highest' value to the vulnerabilities array with the highest sum of vulnerabilities
// don't really need this, but it's here for reference
// fakeData[maxVulnIndex].vulnerabilities.push('highest')

// find the actual value of the highest sum of vulnerabilities
const maxVuln = fakeData[maxVulnIndex].vulnerabilities[4]

// for each in fakedata, what percentage of the maxVuln is the sum of vulnerabilities
fakeData.forEach((item, index) => {
  fakeData[index].vulnerabilities[5] = Math.round((item.vulnerabilities[4] / maxVuln) * 100)
})

// create the array of objects with random data
const assetData = fakeArray(100)

// merge the two arrays with fakeData into fakeData2 at a specific index
assetData.forEach((item, index) => {
  assetData[index].vulnerabilities.bar = fakeData[index].vulnerabilities
})

export { assetColumns, assetData }
