import { faker } from '@faker-js/faker'

const sanitizeName = name => name.toLowerCase().replace(/[^\w\s]/gi, '')

const fakeUserData = length => {
  let users = []
  for (let i = 0; i < length; i++) {
    const status = faker.helpers.arrayElement(['Active', 'Deactivated'])
    const variant = status === 'Active' ? 'success' : 'danger'

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = `${sanitizeName(firstName)}.${sanitizeName(lastName)}@acme.io`

    users.push({
      status: {
        value: status,
        props: {
          label: status,
          variant: variant,
          outlined: true,
        },
      },
      name: `${firstName} ${lastName}`,
      email: email,
      role: faker.helpers.arrayElement(['Admin', 'Partner', 'User']),
      last_active: faker.date.recent().toISOString(),
    })
  }
  return users
}

export { fakeUserData }