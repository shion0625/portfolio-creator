import { fakePageInfo } from './'
import { faker } from '@faker-js/faker'
import { Model } from '~/models/client'
import { User, UserPagination } from '~/models/types'

export const fakeUser: User = {
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  created_at: faker.date.recent().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  serial_number: faker.datatype.number(),
}

export const fakeUserPagination: UserPagination = {
  nodes: Array.from({ length: 3 }, () => fakeUser),
  pageInfo: fakePageInfo,
  type: Model.User,
}

export const fakeUserPaginationWithoutType: Pick<UserPagination, Exclude<keyof UserPagination, 'type'>> = {
  nodes: Array.from({ length: 3 }, () => fakeUser),
  pageInfo: fakePageInfo,
}
