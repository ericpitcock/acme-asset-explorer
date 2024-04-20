import { faker } from '@faker-js/faker'

// generate a fake, yet realistic ip address that allows you to choose the first octet
export const generateIpAddress = (firstOctet) => {
  return `${firstOctet}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

/// Windows OS versions
const windowsVersions = [
  'Windows 11 (23H2)',
  'Windows 11 (22H2)',
  'Windows 11 (21H2)',
  // 'Windows 10 (22H2)',
  // 'Windows 10 (21H2)'
]

// macOS versions
const macOSVersions = [
  // five most recent macOS versions
  'macOS Sonoma (14.4.1)',
  'macOS Sonoma (14.4)',
  'macOS Sonoma (14.3.1)',
  'macOS Sonoma (14.3)',
  'macOS Sonoma (14.2.1)'
]

// Linux distributions
const linuxDistributions = [
  'Red Hat Enterprise Linux (RHEL) 8.4',
  'Ubuntu Server 20.04 LTS',
  // 'CentOS 8.4',
  // 'SUSE Linux Enterprise Server (SLES) 15 SP3',
  // 'Debian 11 (Bullseye)'
]

export { windowsVersions, macOSVersions, linuxDistributions }

export const generateOsVersion = (os) => {
  switch (os) {
    case 'Windows':
      return faker.helpers.arrayElement(windowsVersions)
    case 'macOS':
      return faker.helpers.arrayElement(macOSVersions)
    case 'Linux':
      return faker.helpers.arrayElement(linuxDistributions)
    default:
      return 'Unknown'
  }
}

// dates
const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

export const generatePastDate = (years = {}) => {
  const date = faker.date.past(years).toISOString()
  return formatDate(date)
}

export const generateRecentDate = (days = {}) => {
  const date = faker.date.recent(days).toISOString()
  return formatDate(date)
}

// future date
export const generateFutureDate = (years = {}) => {
  const date = faker.date.future(years).toISOString()
  return formatDate(date)
}
