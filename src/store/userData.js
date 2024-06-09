import { faker } from '@faker-js/faker'
import { generateRecentDate } from '../utils/helpers'

const sanitizeName = name => name.toLowerCase().replace(/[^\w\s]/gi, '')

const userStatusStylesMap = {
  Active: {
    '--ep-status-indicator-dot-bg': 'var(--color-status--success-bg)',
    '--ep-status-indicator-dot-border': 'var(--ep-status-indicator-dot-bg)'
  },
  Deactivated: {
    '--ep-status-indicator-dot-bg': 'transparent',
    '--ep-status-indicator-dot-border': 'var(--border-color--lighter)'
  },
}

const fakeUserData = length => {
  let users = []
  for (let i = 0; i < length; i++) {
    const status = faker.helpers.arrayElement(['Active', 'Deactivated'])
    // const variant = status === 'Active' ? 'success' : 'danger'
    const role = faker.helpers.arrayElement(['Admin', 'Partner', 'User'])

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = `${sanitizeName(firstName)}.${sanitizeName(lastName)}@acme.io`

    users.push({
      id: faker.string.uuid(),
      role: {
        value: role,
        props: {
          label: role,
          styles: {
            '--ep-badge-bg-color': 'transparent',
            '--ep-badge-border-color': 'var(--color-status--success-bg)',
          }
        },
      },
      status: status,
      name: {
        value: `${firstName} ${lastName}`,
        props: {
          value: `${firstName} ${lastName}`,
          tooltip: status,
          styles: userStatusStylesMap[status],
        },
      },
      email: email,
      user_mobile_phone: `206-${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
      office_phone: `206-${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
      last_active: generateRecentDate(),
    })
  }
  return users
}

export { fakeUserData }