import { faker } from '@faker-js/faker'
import { markRaw } from 'vue'
import EpBadge from '../../node_modules/@ericpitcock/epicenter-vue-components/src/components/badge/EpBadge.vue'

const vulnTableColumns = [
  {
    header: 'Severity',
    key: 'severity',
    cellType: 'component',
    component: markRaw(EpBadge),
  },
  {
    header: 'Description',
    key: 'description',
    formatter: (value) => {
      const subString = value.substring(0, 140)
      return `<span style="line-height: 1.5;">${subString}…</span>`
    }
  },
  {
    header: 'Affected Assets',
    key: 'affected_assets',
  },
  {
    header: 'Score',
    key: 'base_score'
  },
  {
    header: 'ID',
    key: 'id',
    formatter: (value) => {
      return `<span class="text--overflow">${value}</span>`
    }
  },
  {
    header: 'Published Date',
    key: 'published_date',
    formatter: (value) => {
      return new Date(value).toLocaleString()
    }
  },
  {
    header: 'Last Modified Date',
    key: 'last_modified_date',
    formatter: (value) => {
      return new Date(value).toLocaleString()
    }
  },
  {
    header: 'Date Seen',
    key: 'date_seen',
    formatter: (value) => {
      return new Date(value).toLocaleString()
    }
  }
]

function generateCveDesc() {
  const protocol = faker.internet.protocol()
  const port = faker.internet.port()

  const introPhrases = [
    'Exploiting',
    'A vulnerability in',
    'Discovered',
    'Security flaw found in',
    'Issue detected in',
    'Weakness identified in'
  ]

  const actionPhrases = [
    'has been discovered',
    'was detected',
    'has been identified',
    'was found',
    'has come to light',
    'has surfaced'
  ]

  const targetPhrases = [
    'The system',
    'A network interface',
    'The application',
    'A device',
    'A service',
    'An operating system'
  ]

  const exploitPhrases = [
    'is vulnerable to',
    'is susceptible to exploitation through',
    'has been compromised by',
    'is prone to attacks via',
    'has been found to be exploitable via',
    'is exposed to potential attacks through'
  ]

  const actionVerbPhrases = [
    'allowing attackers to gain unauthorized access',
    'enabling unauthorized access to sensitive information',
    'permitting remote code execution',
    'resulting in a denial of service',
    'facilitating data exfiltration',
    'leading to system compromise'
  ]

  const observationPhrases = [
    'Vulnerable files',
    'Critical directories',
    'Sensitive data',
    'Key components',
    'Critical infrastructure',
    'System resources'
  ]

  const observationActionPhrases = [
    'have been observed',
    'were detected',
    'have been compromised',
    'were found to be vulnerable',
    'have been targeted',
    'have been identified as at-risk'
  ]

  const randomIntroPhrase = faker.helpers.arrayElement(introPhrases)
  const randomActionPhrase = faker.helpers.arrayElement(actionPhrases)
  const randomTargetPhrase = faker.helpers.arrayElement(targetPhrases)
  const randomExploitPhrase = faker.helpers.arrayElement(exploitPhrases)
  const randomActionVerbPhrase = faker.helpers.arrayElement(actionVerbPhrases)
  const randomObservationPhrase = faker.helpers.arrayElement(observationPhrases)
  const randomObservationActionPhrase = faker.helpers.arrayElement(observationActionPhrases)

  const description = `
    ${randomIntroPhrase} ${faker.hacker.adjective()} ${faker.hacker.noun()} ${randomActionPhrase}.
    ${randomTargetPhrase} ${randomExploitPhrase} ${protocol} on port ${port}, ${randomActionVerbPhrase}.
    ${randomObservationPhrase} ${randomObservationActionPhrase}.
  `
  return description.trim()
}

const vulnTableData = []

for (let i = 0; i < 100; i++) {
  const severity = faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical'])
  const variant = severity === 'Low' ? 'success' :
    severity === 'Medium' ? 'warning' :
      severity === 'High' ? 'warning' : 'danger'

  // generate base_score based on severity
  // 0.0 to 3.9: Low
  // 4.0 to 6.9: Medium
  // 7.0 to 8.9: High
  // 9.0 to 10.0: Critical
  const baseScore = severity === 'Low' ? faker.number.float({ min: 0, max: 3.9, multipleOf: 0.1 }) :
    severity === 'Medium' ? faker.number.float({ min: 4, max: 6.9, multipleOf: 0.1 }) :
      severity === 'High' ? faker.number.float({ min: 7, max: 8.9, multipleOf: 0.1 }) :
        faker.number.float({ min: 9, max: 10, multipleOf: 0.1 })

  vulnTableData.push({
    severity: {
      value: severity,
      props: {
        label: severity,
        variant,
        outlined: true,
        borderColor: `var(--severity-color--${severity.toLowerCase()}--border)`,
      },
    },
    description: generateCveDesc(),
    affected_assets: faker.number.int({ min: 1, max: 100 }),
    base_score: baseScore,
    id: `CVE-${faker.date.recent().getFullYear()}-${faker.number.int({ min: 1000, max: 9999 })}`,
    published_date: faker.date.past().toISOString(),
    last_modified_date: faker.date.recent().toISOString(),
    date_seen: faker.date.between({
      // from 30 days ago
      from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
      // to today
      to: new Date().toISOString()
    }).toISOString()
  })
}

export { vulnTableColumns, vulnTableData }
