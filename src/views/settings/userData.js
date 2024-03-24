import { faker } from '@faker-js/faker'

const fakeUserData = length => {
  let users = []
  for (let i = 0; i < length; i++) {
    users.push({
      status: faker.helpers.arrayElement(['Active', 'Deactivated']),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['Admin', 'Partner Admin', 'User']),
      last_active: faker.date.recent().toISOString(),
    })
  }
  return users
}

export { fakeUserData }