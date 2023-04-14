import { createFakePageInfo } from './'
import { faker } from '@faker-js/faker'
import { Model } from '~/models/client'
import { User, UserPagination } from '~/models/types'

export const createFakeUser = (): User => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    serial_number: faker.datatype.number(),
  }
}

export const createFakeUserPagination = (): UserPagination => {
  return {
    nodes: Array.from({ length: 3 }, () => createFakeUser()),
    pageInfo: createFakePageInfo(),
    type: Model.User,
  }
}

export const createFakeUserPaginationWithoutType = (): Pick<UserPagination, Exclude<keyof UserPagination, 'type'>> => {
  return {
    nodes: Array.from({ length: 3 }, () => createFakeUser()),
    pageInfo: createFakePageInfo(),
  }
}
