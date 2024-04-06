import { faker } from '@faker-js/faker'
import { markRaw } from 'vue'
import EpSparkBar from '../../../node_modules/@ericpitcock/epicenter-vue-components/src/components/spark-bar/EpSparkBar.vue'
import EpBadge from '../../../node_modules/@ericpitcock/epicenter-vue-components/src/components/badge/EpBadge.vue'
import store from '../../store'

const assetColumns = [
  {
    header: 'ID',
    key: 'id'
  },
  {
    header: 'Status',
    key: 'status',
    cellType: 'component',
    component: markRaw(EpBadge),
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
    header: 'Endpoint Version',
    key: 'endpoint_version',
    formatter: (value) => {
      if (value != '1.0.2') {
        return `<span style="color: var(--text-color--danger);">${value} △</span>`
      }
      return value
    }
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

// create an array of objects with random data, placeholder for vulnerabilities
const fakeArray = length => {
  let arr = []
  for (let i = 0; i < length; i++) {
    const status = faker.helpers.arrayElement(['Active', 'Inactive', 'Archived'])
    const variant = status === 'Active' ? 'success' : status === 'Inactive' ? 'warning' : 'danger'

    const sites = store.state.sites.map(site => site.name)

    arr.push({
      id: faker.string.uuid(),
      status: {
        value: status,
        props: {
          label: status,
          variant,
          outlined: true
        },
      },
      user: `${faker.person.firstName()}.${faker.person.lastName()}@acme.io`,
      ip_address: faker.internet.ipv4(),
      vulnerabilities: {
        value: null, // placeholder for total vulnerabilities
        props: {
          bar: []
        },
      },
      endpoint_version: status === 'Archived' ? '1.0.0' : faker.helpers.arrayElement(['1.0.0', '1.0.1', '1.0.2']),
      location: faker.helpers.arrayElement(sites),
      operating_system: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux']),
      last_seen: status === 'Archived' ? faker.date.between({ from: '2017-01-01T00:00:00.000Z', to: '2022-01-01T00:00:00.000Z' }) : faker.date.recent({ days: 10 }),
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
  assetData[index].vulnerabilities.props.bar = fakeData[index].vulnerabilities
  // add total vulnerabilities.value to each object
  assetData[index].vulnerabilities.value = fakeData[index].vulnerabilities[4]
})

export { assetColumns, assetData }
