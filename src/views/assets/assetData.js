import { faker } from '@faker-js/faker'
import { markRaw } from 'vue'
import {
  generateIpAddress,
  generateOsVersion,
  generatePastDate,
  generateRecentDate
} from '../../utils/helpers'
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

// create array with counts for
// low, medium, high, critical vulns and the sum of all
// [low, medium, high, critical, sum]
const generateVulnCounts = () => {
  let arr = []
  for (let index = 0; index < 4; index++) {
    // as the index gets higher, the number of vulnerabilities decreases
    arr.push(faker.number.int({ min: 0, max: 100 - index * 20 }))
  }
  // push the sum of the array to the end of the array
  arr.push(arr.reduce((a, b) => a + b, 0))
  return arr
}

const calculateRiskScore = (status, severityCounts) => {
  if (status === 'Archived') {
    return 'N/A'
  }

  const weights = { low: 1, medium: 3, high: 5, critical: 10 }
  const vulnerabilities = severityCounts

  const weightedCounts = vulnerabilities.map((count, index) => count * weights[Object.keys(weights)[index]])
  const totalWeightedScore = weightedCounts.reduce((acc, curr) => acc + curr, 0)
  // normalized risk score (0-100)
  const normalizedScore = Math.floor((totalWeightedScore / (vulnerabilities.reduce((acc, curr) => acc + curr * 10, 0))) * 100)

  return normalizedScore
}

const calculateRiskScoreBadgeBorderColor = (riskScore) => {
  if (riskScore === 'N/A') {
    return 'var(--border-color)'
  } else if (riskScore < 30) {
    return 'var(--severity-color--medium--border)'
  } else if (riskScore < 60) {
    return 'var(--severity-color--high--border)'
  } else {
    return 'var(--severity-color--critical--border)'
  }
}

// create an array of objects with random data, placeholder for vulnerabilities
const assetDataArray = length => {
  let arr = []
  for (let i = 0; i < length; i++) {
    const vulnCounts = generateVulnCounts()

    const status = faker.helpers.arrayElement(['Active', 'Inactive', 'Archived'])

    const userStatusTooltipMap = {
      Active: `Active within the last 24 hours`,
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

    const riskScore = calculateRiskScore(status, vulnCounts.slice(0, 4))
    const riskScoreBadgeStyles = {
      '--ep-badge-bg-color': 'transparent',
      '--ep-badge-border-color': calculateRiskScoreBadgeBorderColor(riskScore)
    }

    const sites = ['New York City', 'London', 'Tokyo']
    const operatingSystem = faker.helpers.arrayElement(['Windows', 'macOS', 'Linux'])
    const userFirstName = faker.person.firstName()
    const userLastName = faker.person.lastName()
    const user = `${userFirstName}.${userLastName}@acme.io`
    const hostname = `${faker.helpers.arrayElement(sites).slice(0, 3)}-${operatingSystem.slice(0, 3)}-${userFirstName.slice(0, 1) + userLastName}`

    arr.push({
      id: faker.string.uuid(),
      status: status,
      risk_score: {
        value: riskScore === 'N/A' ? 0 : riskScore * 10,
        props: {
          label: riskScore.toString(),
          styles: riskScoreBadgeStyles
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
      hostname: hostname.toLowerCase(),
      ip_address: generateIpAddress(10),
      vulnerabilities: {
        value: vulnCounts[4],
        props: {
          bar: vulnCounts,
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

// create asset and vulnerability arrays
const assetData = assetDataArray(100)
// const vulnData = generateVulnData(100)

// find the index of the array with the highest sum of vulnerabilities in the assetData
const maxVulnIndex = assetData.reduce((maxIndex, data, currentIndex, dataArray) => {
  // Check if the current asset has more vulnerabilities than the one at maxIndex
  if (data.vulnerabilities.value > dataArray[maxIndex].vulnerabilities.value) {
    // If so, update maxIndex to currentIndex
    return currentIndex
  } else {
    // Otherwise, keep maxIndex unchanged
    return maxIndex
  }
}, 0)

// find the actual value of the highest sum of vulnerabilities
const maxVuln = assetData[maxVulnIndex].vulnerabilities.value

// for each vuln sum, calculate what percentage it is of maxVuln
// add it to the last element in the array
assetData.forEach((item, index) => {
  assetData[index].vulnerabilities.props.bar.push(Math.round((assetData[index].vulnerabilities.props.bar[4] / maxVuln) * 100))
})

// give the maxVulnIndex 100%
assetData[maxVulnIndex].vulnerabilities.props.bar.push(100)

export { assetColumns, assetData }
