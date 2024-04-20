import { faker } from '@faker-js/faker'
import { markRaw } from 'vue'
import { generateIpAddress, generateOsVersion, generatePastDate, generateRecentDate } from '../../utils/helpers'
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
    formatter: (value) => {
      return `<span class="text--overflow-hidden">${value}</span>`
    }
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
    const status = faker.helpers.arrayElement(['Active', 'Inactive', 'Archived'])

    const riskScore = status === 'Active'
      ? faker.number.int({ min: 0, max: 100 })
      : status === 'Inactive' ? faker.number.int({ min: 0, max: 50 })
        : 'N/A'

    const riskScoreVariant = riskScore === 'N/A'
      ? 'secondary'
      : riskScore < 50 ? 'success'
        : riskScore < 75 ? 'warning'
          : 'danger'

    const sites = ['New York City', 'London', 'Tokyo']
    const operatingSystem = faker.helpers.arrayElement(['Windows', 'macOS', 'Linux'])
    const user = `${faker.person.firstName()}.${faker.person.lastName()}@acme.io`

    // const userStatusTooltip = status === 'Active'
    //   ? `Activity within the last 24 hours`
    //   : status === 'Inactive' ? `No activity in the last 24 hours`
    //     : `Archived since ${faker.date.between({ from: '2017-01-01T00:00:00.000Z', to: '2022-01-01T00:00:00.000Z' })}`

    // convert the above to a map for easier access
    const userStatusTooltipMap = {
      Active: `Activity within the last 24 hours`,
      Inactive: `No activity in the last 24 hours`,
      Archived: `Archived ${generatePastDate()}`
    }

    const userStatusStylesMap = {
      Active: {
        '--ep-status-indicator-dot-bg': 'hsl(90 80% 35% / 1)',
        '--ep-status-indicator-dot-border': 'var(--ep-status-indicator-dot-bg)'
      },
      Inactive: {
        '--ep-status-indicator-dot-bg': 'transparent',
        '--ep-status-indicator-dot-border': 'var(--border-color--lighter)'
      },
      Archived: {
        '--ep-status-indicator-dot-bg': 'red',
        '--ep-status-indicator-dot-border': 'red'
      }
    }

    arr.push({
      id: faker.string.uuid(),
      status: status,
      risk_score: {
        value: riskScore === 'N/A' ? 0 : riskScore,
        props: {
          label: riskScore.toString(),
          variant: riskScoreVariant,
          outlined: true,
        },
      },
      user: {
        value: user,
        props: {
          value: user,
          tooltip: userStatusTooltipMap[status],
          styles: userStatusStylesMap[status]
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
      endpoint_version: status === 'Archived'
        ? '1.0.0'
        : faker.helpers.arrayElement(['1.0.0', '1.0.1', '1.0.2']),
      location: faker.helpers.arrayElement(sites),
      operating_system: operatingSystem,
      os_version: generateOsVersion(operatingSystem),
      last_seen: status === 'Archived'
        ? faker.date.between({ from: '2017-01-01T00:00:00.000Z', to: '2022-01-01T00:00:00.000Z' })
        : generateRecentDate({ days: 10 }),
      ipv6_address: faker.internet.ipv6(),
      mac_address: faker.internet.mac()
    })
  }
  return arr
}

// create array with counts for
// low, medium, high, critical vulns and the sum of all
// [low, medium, high, critical, sum]
const generateVulnCounts = () => {
  let arr = []
  for (let index = 0; index < 4; index++) {
    // as the index gets higher, the number of vulnerabilities decreases
    arr.push(faker.number.int({ min: 0, max: 100 - index * 30 }))
  }
  // push the sum of the array to the end of the array
  arr.push(arr.reduce((a, b) => a + b, 0))
  return arr
}

// create array of vulnerability count arrays to process
const generateVulnData = length => {
  let arr = []
  for (let index = 0; index < length; index++) {
    arr.push(generateVulnCounts())
  }
  return arr
}

// create asset and vulnerability arrays
const assetData = assetDataArray(100)
const vulnData = generateVulnData(100)

// find the index of the array with the highest sum of vulnerabilities,
// which is the last element in the vulnerabilities property
// const maxVulnIndex = vulnData.reduce((iMax, x, i, arr) => x[4] > arr[iMax][4] ? i : iMax, 0)
const maxVulnIndex = vulnData.reduce((maxIndex, data, currentIndex, dataArray) => data[4] > dataArray[maxIndex][4] ? currentIndex : maxIndex, 0)

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
