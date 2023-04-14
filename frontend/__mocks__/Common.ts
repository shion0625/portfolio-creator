import { faker } from '@faker-js/faker'
import { PaginationInfo } from '~/models/types'

export const createFakePageInfo = (): PaginationInfo => {
  return {
    page: faker.datatype.number(),
    hasNextPage: faker.datatype.boolean(),
    count: faker.datatype.number(),
    totalCount: faker.datatype.number(),
    paginationLength: faker.datatype.number(),
    hasPreviousPage: faker.datatype.boolean(),
  }
}

export const createFakeIds = () => {
  return {
    nodes: Array.from({ length: 3 }, () => ({ id: faker.datatype.uuid() })),
  }
}
