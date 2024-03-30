import { faker } from '@faker-js/faker'

const vulnTableColumns = [
  {
    header: 'ID',
    key: 'id',
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
    header: 'Score',
    key: 'baseScore'
  },
  {
    header: 'Severity',
    key: 'baseSeverity',
    formatter: (value) => {
      return `<span class="text--capitalize">${value}</span>`
    }
  },
  {
    header: 'Published Date',
    key: 'publishedDate',
    formatter: (value) => {
      return new Date(value).toLocaleString()
    }
  },
  {
    header: 'Last Modified Date',
    key: 'lastModifiedDate',
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
  vulnTableData.push({
    id: `CVE-${faker.date.recent().getFullYear()}-${faker.number.int({ min: 1000, max: 9999 })}`,
    description: generateCveDesc(),
    baseScore: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
    baseSeverity: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
    publishedDate: faker.date.past().toISOString(),
    lastModifiedDate: faker.date.recent().toISOString()
  })
}

export { vulnTableColumns, vulnTableData }
