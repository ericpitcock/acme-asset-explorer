import { faker } from '@faker-js/faker'
import { markRaw } from 'vue'
import { generateIpAddress, generateOsVersion } from '../../utils/helpers'
import InUserStatus from '../../components/InUserStatus.vue'
import InSparkBar from '../../components/InSparkBar.vue'
import EpBadge from '../../../node_modules/@ericpitcock/epicenter-vue-components/src/components/badge/EpBadge.vue'

const assetColumns = [
  {
    header: 'ID',
    key: 'id',
  },
  {
    header: 'Status',
    key: 'status',
  },
  {
    header: 'Risk Score',
    key: 'risk_score',
    cellType: 'component',
    component: markRaw(EpBadge),
  },
  {
    header: 'User',
    key: 'user',
    cellType: 'component',
    component: markRaw(InUserStatus),
  },
  {
    header: 'Hostname',
    key: 'hostname',
  },
  {
    header: 'IP Address',
    key: 'ip_address',
    style: 'tabular-numbers',
  },
  {
    header: 'Vulnerabilities',
    key: 'vulnerabilities',
    cellType: 'component',
    component: markRaw(InSparkBar),
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
    key: 'location',
  },
  {
    header: 'Operating System',
    key: 'operating_system',
  },
  {
    header: 'OS Version',
    key: 'os_version',
  },
  {
    header: 'Last Seen',
    key: 'last_seen',
    formatter: (value) => new Date(value).toLocaleString(),
  },
  {
    header: 'IPv6 Address',
    key: 'ipv6_address',
    style: 'tabular-numbers',
  },
  {
    header: 'MAC Address',
    key: 'mac_address',
    style: 'tabular-numbers',
  }
]

// create an array of objects with random data, placeholder for vulnerabilities
const assetDataArray = length => {
  let arr = []
  for (let i = 0; i < length; i++) {
    const riskScore = faker.number.int({ min: 0, max: 100 })
    const riskScoreVariant = riskScore < 50 ? 'success' : riskScore < 75 ? 'warning' : 'danger'
    const status = faker.helpers.arrayElement(['Active', 'Inactive', 'Archived'])
    // const variant = status === 'Active' ? 'success' : status === 'Inactive' ? 'warning' : 'danger'
    const sites = ['New York City', 'London', 'Tokyo']
    const operatingSystem = faker.helpers.arrayElement(['Windows', 'macOS', 'Linux'])
    const user = `${faker.person.firstName()}.${faker.person.lastName()}@acme.io`
    const tooltip = status === 'Active'
      ? `Active since ${faker.date.between({ from: '2017-01-01T00:00:00.000Z', to: '2022-01-01T00:00:00.000Z' })}`
      : status === 'Inactive' ? `Last seen ${faker.date.recent({ days: 10 })}`
        : `Archived since ${faker.date.between({ from: '2017-01-01T00:00:00.000Z', to: '2022-01-01T00:00:00.000Z' })}`
    // create status indicator colors based on status
    // if active, both are green, if inactive, both are yellow, if archived, both are red
    const statusIndicator = status === 'Active'
      ? { backgroundColor: 'green', borderColor: 'green' }
      : status === 'Inactive' ? { backgroundColor: 'yellow', borderColor: 'yellow' }
        : { backgroundColor: 'red', borderColor: 'red' }


    arr.push({
      id: faker.string.uuid(),
      status: status,
      risk_score: {
        value: riskScore,
        props: {
          label: riskScore,
          variant: riskScoreVariant,
          outlined: true,
        },
      },
      user: {
        value: user,
        props: {
          value: user,
          tooltip: tooltip,
          ...statusIndicator
        },
      },
      hostname: faker.internet.domainName(),
      ip_address: generateIpAddress(10),
      vulnerabilities: {
        value: null, // placeholder for total vulnerabilities
        props: {
          bar: [],
        },
      },
      endpoint_version: status === 'Archived' ? '1.0.0' : faker.helpers.arrayElement(['1.0.0', '1.0.1', '1.0.2']),
      location: faker.helpers.arrayElement(sites),
      operating_system: operatingSystem,
      os_version: generateOsVersion(operatingSystem),
      last_seen: status === 'Archived' ? faker.date.between({ from: '2017-01-01T00:00:00.000Z', to: '2022-01-01T00:00:00.000Z' }) : faker.date.recent({ days: 10 }),
      ipv6_address: faker.internet.ipv6(),
      mac_address: faker.internet.mac()
    })
  }
  return arr
}

// create array with counts for
// low, medium, high, critical vulns and the sum of all
// [low, medium, high, critical, sum]
const generateVulnerabilityCounts = () => {
  let arr = []
  for (let i = 0; i < 4; i++) {
    arr.push(faker.number.int({ min: 0, max: 100 }))
  }
  // push the sum of the array to the end of the array
  arr.push(arr.reduce((a, b) => a + b, 0))
  return arr
}

// create array of vulnerability count arrays to process
const generateVulnerabilityData = length => {
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push(generateVulnerabilityCounts())
  }
  return arr
}

// create asset and vulnerability arrays
const assetData = assetDataArray(100)
const vulnData = generateVulnerabilityData(100)

// find the index of the array with the highest sum of vulnerabilities,
// which is the last element in the vulnerabilities property
const maxVulnIndex = vulnData.reduce((iMax, x, i, arr) => x[4] > arr[iMax][4] ? i : iMax, 0)

// find the actual value of the highest sum of vulnerabilities
const maxVuln = vulnData[maxVulnIndex][4]

// give the maxVulnIndex 100% 
vulnData[maxVulnIndex][5] = 100

// for each vuln sum, calculate what percentage it is of maxVuln
// add it to the last element in the array
vulnData.forEach((item, index) => {
  vulnData[index][5] = Math.round((item[4] / maxVuln) * 100)
})

// add the vulnData to the assetData
assetData.forEach((item, index) => {
  assetData[index].vulnerabilities.props.bar = vulnData[index]
  // add total vulnerabilities.value to each object
  assetData[index].vulnerabilities.value = vulnData[index][4]
})

export { assetColumns, assetData }
